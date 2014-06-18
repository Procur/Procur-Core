/**
 * denyAllAccess
 *
 * @module      :: Policy
 * @description :: Denies all access to a controller action
 *
 *
 *
 */
module.exports = function (req, res, next) {
  if(req.session.authenticated == true){
    res.redirect('/dashboard');
  }
  else {
    res.redirect('/');
  }
};
