/**
 * DownloadController
 *
 * @description :: Server-side logic for managing downloads
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	process: function(req, res){
    var b = req.body;
    User.findOne({ id: req.session.passport.user }, function(err, user) {
      Company.findOne({ user: user.id }, function(err, company) {
        if (err) { return res.redirect('/dashboard'); }
        if(user.activeMode == 'supplier'){
          Supplier.findOne({ company: company.id }, function(err, supplier){
            if(err){ return res.redirect('/dashboard'); }
            var i = 0;
            while (b["downloadTitle" + i]) {
              Download.create({
                owner: supplier.id,
                title: b["downloadTitle" + i]
              }, function(err, download) {
                if (err) { return res.redirect('/dashboard'); }
              });
              i=i+1;
            }
            return res.redirect('/company/update#photosDownloadsSupplier');
          });
        }
        if (user.activeMode == 'buyer'){
          Buyer.findOne({ company: company.id }, function(err, buyer){
            if(err){ return res.redirect('/dashboard'); }
            var i = 0;
            while (b["downloadTitle" + i]) {
              Download.create({
                owner: buyer.id,
                title: b["downloadTitle" + i]
              }, function(err, download) {
                if (err) { return res.redirect('/dashboard'); }
              });
              i=i+1;
            }
            return res.redirect('/company/update#photosDownloadsBuyer');
          });
        }

      });
    });
  }

  /* Need a delete function */
};
