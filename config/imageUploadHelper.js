var cloudinary = require('cloudinary');
var fs = require('fs');

module.exports.imageUploadHelper = {
  
  getFileSize: function(file) {
    var stats = fs.statSync(file);
    var fileSize = stats['size'];
    if (fileSize > 0){
      return true;
    }
    else {
      return false;
    }
  },

  uploadSupplierImage: function(req, res, userObj, image) {
    cloudinary.uploader.upload(image, function(result) {
      Supplier.update(userObj, { logoUrl: result.url }, function(err, supplier) {
        if (err) { return res.redirect('/') };
      });
    },
    {
      format: 'jpg',
      width: 150,
      height: 150,
      crop: 'thumb',
      gravity: 'face',
      radius: 'max'
    });
  },

  uploadBuyerImage: function(req, res, userObj, image) {
    cloudinary.uploader.upload(image, function(result) {
      Buyer.update(userObj, { logoUrl: result.url }, function(err, buyer) {
        if (err) { return res.redirect('/') };
      });
    },
    {
      format: 'jpg',
      width: 150,
      height: 150,
      crop: 'thumb',
      gravity: 'face',
      radius: 'max'
    });
  }

}