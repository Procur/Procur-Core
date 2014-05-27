/**
 * isVerified
 *
 * @module      :: Policy
 * @description :: Checks User db object for emailVerified : true
 */
module.exports = function (req, res, next) {
  var user = req.session.passport.user;
  User.findOne({ id: user }, function(err, user){
    if(err){
      res.redirect('/dashboard');
    }
    else if(user.emailVerified == false) {
      res.redirect('/pleaseverify');
    }
    else {
      return next();
    }
  });
};
