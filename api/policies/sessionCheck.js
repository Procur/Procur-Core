/**
 * sessionCheck
 *
 * @module      :: Policy
 * @description :: Checks session for presence of user ID
 */
module.exports = function (req, res, next) {
  if(req.session.passport.user) {
    req.session.authenticated = true;
    return next();
  }
  else {
    res.redirect('/');
  }
};
