const BlogPost = require('../models/BlogPost');
module.exports = async (req, res) => {
	const search = req.body.search;
	const blogs = await BlogPost.find(); // return array of matched objects
	const matchedBlogs = blogs.filter(
		obj =>
			obj.title.toLowerCase().includes(search.toLowerCase()) ||
			obj.body.toLowerCase().includes(search.toLowerCase())
	);
	res.render('index', {
		blogs: matchedBlogs,
	});
};
