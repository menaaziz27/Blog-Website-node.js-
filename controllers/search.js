const BlogPost = require('../models/BlogPost');
module.exports = async (req, res) => {
    // console.log(req.body.search)
    const search = req.body.search;
    const blogs = await BlogPost.find(); // return array of matched objects
    const matchedBlogs = blogs.filter((obj) => obj.title.toLowerCase().includes(search.toLowerCase()) ||
        obj.body.toLowerCase().includes(search.toLowerCase()));
    console.log(matchedBlogs);
    res.render('index', {
        blogs: matchedBlogs
    })
}