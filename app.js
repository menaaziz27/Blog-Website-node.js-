const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('ejs')
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
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');

mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(fileUpload()); // adds files property to the req object

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// custom middleware
// all app.use() functions calls next()
// const customMiddleware = (req, res, next) => {
//     console.log('This is always called whenever visiting any route')
//     next();
// }
// app.use(customMiddleware);


// app.use(validationMiddleware);

app.use('/posts/store', validationMiddleware);


// orders matter from here
app.get('/', homeController);

// if we tried to type localhost:3000/post/123456
app.get('/post/:id', getPostController)
// to create new blog
app.get('/posts/new', newPostController);

// Create blog
app.post('/posts/store', storePostController);
// search for a blog
app.post('/posts/search', searchController);

// User routes
app.get('/auth/user', newUserController);

app.post('/users/register', storeUserController)

app.get('/auth/login', loginController)

app.post('/users/login', loginUserController)

app.listen(3000);