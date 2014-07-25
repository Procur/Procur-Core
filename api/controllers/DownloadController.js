/**
 * DownloadController
 *
 * @description :: Server-side logic for managing downloads
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	process: function(req, res){
    var b = req.body;
    if (b["downloadTitle"]){
      User.findOne({ id: req.session.passport.user }, function(err, user) {
        Company.findOne({ user: user.id }, function(err, company) {
          if (err) { return res.redirect('/dashboard'); }
          if(user.activeMode == 'supplier'){
            Supplier.findOne({ company: company.id }, function(err, supplier){
              if(err){ return res.redirect('/dashboard'); }
              if (typeof b["downloadTitle"]=="string"){
                Download.create({
                  owner: supplier.id,
                  title: b["downloadTitle"]
                }, function(err, download) {
                  if (err) { return res.redirect('/dashboard'); }
                });
              } else {
                for (var i=0; i<b["downloadTitle"].length; i++){
                  Download.create({
                    owner: supplier.id,
                    title: b["downloadTitle"][i]
                  }, function(err, download) {
                    if (err) { return res.redirect('/dashboard'); }
                  });
                }
              }
            });
          }
          if (user.activeMode == 'buyer'){
            Buyer.findOne({ company: company.id }, function(err, buyer){
              if(err){ return res.redirect('/dashboard'); }
              if (typeof b["downloadTitle"]=="string"){
                if (b["downloadTitle"]!==""){
                  Download.create({
                    owner: buyer.id,
                    title: b["downloadTitle"]
                  }, function(err, download) {
                    if (err) { return res.redirect('/dashboard'); }
                  });
                }
              } else {
                for (var i=0; i<b["downloadTitle"].length; i++){
                  if (b["downloadTitle"][i]!==""){
                    Download.create({
                      owner: buyer.id,
                      title: b["downloadTitle"][i]
                    }, function(err, download) {
                      if (err) { return res.redirect('/dashboard'); }
                    });
                  }
                }
              }
            });
          }
        });
      });
      req.flash('message', 'Downloads successfully uploaded.');
      return res.redirect('/company/update#photosDownloadsBuyer');
    }
    return res.redirect('/company/update#photosDownloadsBuyer');
  },

  remove: function (req, res){
    var b = req.body;
    if (b["deleteMe"]){
      if (typeof b["deleteMe"]=="string"){
        Download.destroy({id: b["deleteMe"]}, function (err, download){
          if(err){ return res.redirect('/dashboard'); }
          if (!download){res.redirect('/dashboard');}
        });
      } else {
        for (var i=0; i<b["deleteMe"].length; i++){
          Download.destroy({id: b["deleteMe"][i]}, function (err, download){
            if(err){ return res.redirect('/dashboard'); }
            if (!download){res.redirect('/dashboard');}
          });
        }
      }
      req.flash('message', 'Downloads successfully removed.');
      return res.redirect('/company/update#photosDownloadsBuyer');
    }
    return res.redirect('/company/update#photosDownloadsBuyer')
  }

  /* Need a delete function */
};
