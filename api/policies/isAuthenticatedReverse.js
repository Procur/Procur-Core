/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function (req, res, next) {
  var is_auth = req.session.authenticated;
  if (is_auth == true) {
    return res.redirect('/dashboard');
  }
  else {
    return res.redirect("/");
  }
};
