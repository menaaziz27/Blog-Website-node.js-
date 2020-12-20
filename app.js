const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('ejs')
const fileUpload = require('express-fileupload');

const path = require('path');

const BlogPost = require('./models/BlogPost');

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
const customMiddleware = (req, res, next) => {
    console.log('This is always called whenever visiting any route')
    next();
}
app.use(customMiddleware);

const validateMiddleware = (req, res, next) => {
    if (req.files === null || req.body.title === null || req.body.body === null) {
        return res.redirect('/posts/new')
    }
    next();
}

app.use('/posts/store', validateMiddleware);

app.get('/', async (req, res) => {
    const blogs = await BlogPost.find({});
    // console.log(blogs);
    res.render('index', {
        blogs
    });
})
app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/contact', (req, res) => {
    res.render('contact');
})

// if we tried to type localhost:3000/post/123456
app.get('/post/:id', async (req, res) => {
    // console.log(req.params.id); // 123456 printed out
    const blogPost = await BlogPost.findById(req.params.id);
    res.render('post', {
        blogPost
    })
})
app.get('/posts/new', (req, res) => {
    res.render('create');
})

// Create blog
app.post('/posts/store', async (req, res) => {
    const image = req.files.image;
    console.log(image);
    image.mv(path.resolve(__dirname, 'public/img', image.name), async (err) => {
        await BlogPost.create({ ...req.body, image: /img/ + image.name }); //spread operator
        res.redirect('/');
    });
    // console.log(req.body);
    // console.log(req.body.title);
    // console.log(req.body.body);
})

app.post('/posts/search', async (req, res) => {
    // console.log(req.body.search)
    const search = req.body.search;
    const blogs = await BlogPost.find(); // return array of matched objects
    const matchedBlogs = blogs.filter((obj) => obj.title.toLowerCase().includes(search.toLowerCase()) ||
        obj.body.toLowerCase().includes(search.toLowerCase()));
    console.log(matchedBlogs);
    res.render('index', {
        blogs: matchedBlogs
    })
})

app.listen(3000);