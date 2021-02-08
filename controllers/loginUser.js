const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (req, res) => {
	const { username, password } = req.body;

	await User.findOne({ username: username }, (err, user) => {
		if (!user) {
			res.redirect('/auth/login');
		}

		bcrypt.compare(password, user.password, (error, same) => {
			if (same) {
				req.session.userId = user._id;
				res.redirect('/');
			} else {
				res.redirect('/auth/login');
			}
		});
	});
};
