/**
 * hasCompanyDenyAction
 *
 * @module      :: Policy
 * @description :: Denies and action if the user already has a company
 *
 *
 *
 */
module.exports = function (req, res, next) {
  User.findOne({ id: req.session.passport.user }, function(err, user){
    if(err) return res.redirect('/dashboard', 500);
    Company.findOne({ user: user.id }, function(err, company){
      if(err) return res.redirect('/dashboard', 500)
      if(company === undefined) {
        return next();
      }
      else {
        return res.redirect('/dashboard');
      }
    });
  });
};
