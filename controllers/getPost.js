const BlogPost = require('../models/BlogPost');
module.exports = async (req, res) => {
    // console.log(req.params.id); // 123456 printed out
    const blogPost = await BlogPost.findById(req.params.id);
    res.render('post', {
        blogPost
    })
}