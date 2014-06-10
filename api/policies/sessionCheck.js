/**
 * sessionCheck
 *
 * @module      :: Policy
 * @description :: Checks session for presence of user ID
 */
module.exports = function (req, res, next) {
  if(req.session.passport.user) {
    return next();
  }
  else {
    res.redirect('/');
  }
};
