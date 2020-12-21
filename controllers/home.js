const BlogPost = require('../models/BlogPost');
module.exports = async (req, res) => {
    try {
        const blogs = await BlogPost.find({});
        res.render('index', {
            blogs
        })
    } catch (e) {
        res.status(500).send(e);
    }
}