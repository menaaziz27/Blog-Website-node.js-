const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
require('ejs');
const fileUpload = require('express-fileupload');

// fix all deprecated warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const searchController = require('./controllers/search');
const getPostController = require('./controllers/getPost');
const storePostController = require('./controllers/storePost');
const validationMiddleware = require('./middleware/validationMiddleware');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutUserController = require('./controllers/logout');

let PORT = process.env.PORT || 3000;

mongoose.connect(
	'mongodb://localhost:27017/my_database',
	{
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	},
	(err, db) => {
		if (err) {
			throw new Error(err);
		}
		console.log('Connected');
	}
);

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(fileUpload()); // adds files property to the req object

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	expressSession({
		secret: 'keyboard cat',
	})
);
global.loggedIn = null;

app.use('*', (req, res, next) => {
	try {
		loggedIn = req.session.userId;
		next();
	} catch (e) {
		res.send(e);
	}
});

app.get('/', homeController);
// if we tried to type localhost:3000/post/123456
app.get('/post/:id', getPostController);
// to create new blog
app.get('/posts/new', authMiddleware, newPostController); // !notice

// Create blog button
app.post(
	'/posts/store',
	authMiddleware,
	validationMiddleware,
	storePostController
);

// search for a blog
app.post('/posts/search', searchController);
// User routes
app.get('/auth/user', redirectIfAuthenticatedMiddleware, newUserController);
// register button
app.post('/users/register', storeUserController);
// get login page
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
// login button
app.post('/users/login', loginUserController);
// get logout page
app.get('/auth/logout', logoutUserController);
// handling 404 page
app.use((req, res) => res.render('notfound'));

app.listen(PORT, () => {
	console.log('App is listening... ');
});
