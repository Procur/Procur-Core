/**
 * DownloadController
 *
 * @description :: Server-side logic for managing downloads
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	process: function(req, res){
    console.log("Hit here.");
    req.file('downloadURI').upload(function (err, files) {
      if (err) return res.serverError(err);
      return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
    });
  }
};
