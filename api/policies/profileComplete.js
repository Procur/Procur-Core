/**
 * profileComplete
 *
 * @module      :: Policy
 * @description :: Checks completeness of a user's profile and redirects to profile setup views if incomplete.
 *
 */

module.exports = function (req, res, next) {
  var profileComplete;

  //TODO add profile field checks.
  console.log("We're in the profile checker policy");

  if (profileComplete) return next();
  // User is not allowed
  else return res.redirect("/welcome");
};
