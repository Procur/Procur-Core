/**
 * isBuyer
 *
 * @module      :: Policy
 * @description :: Checks Company for buyer: true
 *
 *
 *
 */
module.exports = function (req, res, next) {
  User.findOne({ id: req.session.passport.user }, function(err, user){
    if(err) return res.redirect('/dashboard', 500);
    Company.findOne({ user: user.id }, function(err, company){
      if(err) return res.redirect('/dashboard', 500);
      if(company.buyer == true) {
        return next();
      }
      else {
        return res.redirect('/dashboard');
      }
    });
  });
};
