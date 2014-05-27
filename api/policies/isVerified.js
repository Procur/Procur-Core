/**
 * isVerified
 *
 * @module      :: Policy
 * @description :: Checks User db object for emailVerified : true
 *
 *
 *
 */
module.exports = function (req, res, next) {
  var user = req.session.passport.user;
  console.log(req.session);
  User.findOne({ id: user }, function(err, user){
    if(err){
      res.redirect('/');
    }
    else if(user.emailVerified == false) {
      res.redirect('/pleaseverify');
    }
    else {
      return next();
    }
  });
};