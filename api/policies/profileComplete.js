/**
 * profileComplete
 *
 * @module      :: Policy
 * @description :: Checks completeness of a user's profile and redirects to profile setup views if incomplete.
 *
 */

module.exports = function (req, res, next) {
  User.findOne({ id: req.session.user }, function(err, user){
    if (err) return next(err);
    console.log("SESSION: " + req.session.user);
    console.log("USER: " + user);
    if (user.profileComplete == true) {
      if (req.route.path == '/welcome') {
        res.redirect('/dashboard')
      }
      else {
        return next();
      }
    }
    else {
      res.redirect('/welcome');
    }
  });
};
