const BlogPost = require('../models/BlogPost');
module.exports = async (req, res) => {
    try {
        const blogs = await BlogPost.find({});
        console.log(req.session)
        res.render('index', {
            blogs
        })
    } catch (e) {
        res.status(500).send(e);
    }
}