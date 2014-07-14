/**
 * profileComplete
 *
 * @module      :: Policy
 * @description :: Checks completeness of a user's profile and redirects to select buyerorsupplier if complete.
 *
 */

module.exports = function (req, res, next) {
  User.findOne({ id: req.session.passport.user }, function(err, user){
    if (err) return res.redirect('404');
    if (user.profileComplete == true) {
      res.redirect('/welcome/moreinfo')
    }
  });
};
