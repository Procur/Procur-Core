/**
 * wizardComplete
 *
 * @module      :: Policy
 * @description :: sets supplier TF before wizard if only buyer is selected
 *
 */

module.exports = function (req, res, next) {
  var user = req.session.passport.user;
  Company.findOne({ user: user }, function(err, company){
    if(err) { res.redirect('404'); }
    Company.update(company, { buyer: false, supplier: true }, function(err, company){
      if(err) { res.redirect('404'); }
    });
  });
  return next();
}
