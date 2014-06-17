/**
 * profileComplete
 *
 * @module      :: Policy
 * @description :: Checks completeness of a user's profile and redirects to profile setup views if incomplete.
 *
 */

module.exports = function (req, res, next) {

  if(!req.session.passport.user){
    res.redirect('/')
  }
  else{
    User.findOne({ id: req.session.passport.user }, function(err, user){
      if (err) return res.redirect('/adsfasf');
      if (user.profileComplete == true) {
        if (req.route.path == '/welcome') {
          res.redirect('/dashboard');
        }
        else {
          return next();
        }
      }
      else {
        return next();
      }
    });
  }
};
