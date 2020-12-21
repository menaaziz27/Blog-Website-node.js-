const BlogPost = require('../models/BlogPost');
const path = require('path');
module.exports = async (req, res) => {
    const image = req.files.image;
    console.log(image);
    image.mv(path.resolve(__dirname, 'public/img', image.name), async (err) => {
        await BlogPost.create({ ...req.body, image: /img/ + image.name }); //spread operator
        res.redirect('/');
    });
    // console.log(req.body);
    // console.log(req.body.title);
    // console.log(req.body.body);
}