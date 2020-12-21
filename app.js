const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('ejs')
const fileUpload = require('express-fileupload');


const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const searchController = require('./controllers/search');
const getPostController = require('./controllers/getPost');
const storePostController = require('./controllers/storePost');
const validationMiddleware = require('./middleware/validationMiddleware');

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
app.get('/posts/new', newPostController);

// Create blog
app.post('/posts/store', storePostController)

app.post('/posts/search', searchController);

app.listen(3000);