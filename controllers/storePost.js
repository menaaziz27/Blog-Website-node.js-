const BlogPost = require('../models/BlogPost');
const path = require('path');
module.exports = async (req, res) => {
	const image = req.files.image;
	console.log(image);
	image.mv(path.resolve(__dirname, 'public/img', image.name), async err => {
		await BlogPost.create({
			...req.body, //title,body,dataPosted, _id
			image: /img/ + image.name,
			userid: req.session.userId,
		}); //spread operator
		console.log(`/img/${image.name}`);
		res.redirect('/');
	});
};
