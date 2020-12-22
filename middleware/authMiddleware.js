const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId);
        if (!user) { // if it's not logged in
            return res.redirect('/');
        }
        next(); // if the user is logged in
    } catch (e) {
        res.status(404).send(e);
    }

}