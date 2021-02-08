const User = require('../models/User');
module.exports = async (req, res) => {
	try {
		await User.create(req.body);
		res.redirect('/');
	} catch (e) {
		// res.status(400).send(e);
		console.log(e);
		res.redirect('/auth/user');
	}
};
