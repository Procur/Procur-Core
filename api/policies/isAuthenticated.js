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

  // User is allowed, proceed to controller
  //var is_auth = req.isAuthenticated()

  var is_auth = req.session.authenticated;
  
  if (is_auth) {
    console.log("We're in the auth checker");
    return next();
  }
  // User is not allowed
  else {
    console.log("Not auth'd. Should redirect.")
    return res.redirect("/");
  };
};
