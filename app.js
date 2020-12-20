const express = require('express');
const bodyParser = require('body-parser');
require('ejs')
const BlogPost = require('./models/BlogPost');

const path = require('path');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});


const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const blogs = await BlogPost.find({});
    console.log(blogs)
    res.render('index', {
        blogs
    });
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})

// if we tried to type localhost:3000/post/123456
app.get('/post/:id', async (req, res) => {
    console.log(req.params.id); // 123456 printed out
    const blogPost = await BlogPost.findById(req.params.id);
    res.render('post', {
        blogPost
    })
})
app.get('/posts/new', (req, res) => {
    res.render('create')
})

// Create blog
app.post('/posts/store', async (req, res) => {
    // console.log(req.body);
    // console.log(req.body.title);
    // console.log(req.body.body);
    await BlogPost.create(req.body)
    res.redirect('/')
})

app.post('/posts/search', async (req, res) => {
    // console.log(req.body.search)
    const search = req.body.search;
    const blogs = await BlogPost.find(); // return array of matched objects
    const matchedBlogs = blogs.filter((obj) => obj.title.toLowerCase().includes(search.toLowerCase()) ||
        obj.body.toLowerCase().includes(search.toLowerCase()))
    console.log(matchedBlogs)
    res.render('index', {
        blogs: matchedBlogs
    })
})

app.listen(3000);