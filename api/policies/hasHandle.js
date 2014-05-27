/**
 * hasHandle
 *
 * @module      :: Policy
 * @description :: Checks User db object for emailVerified : true
 *
 *
 *
 */
module.exports = function (req, res, next) {
  User.findOne({ id: user }, function(err, user){
    if(err) return res.redirect('/dashboard', 500);
    Company.findOne({ user: user.id }, function(err, company){
      if(err) return res.redirect('/dashboard', 500)
      if(company.handle == undefined) {
        res.redirect('/company/createhandle');
      }
      else {
        return next();
      }
    });
  });
};
