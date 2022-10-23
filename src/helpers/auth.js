const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {

        req.flash('error_msg', 'Not Authorizedd');
        res.redirect('/users/signin');
    }
};

module.exports = helpers;