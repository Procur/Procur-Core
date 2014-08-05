module.exports = {
  getCloudinaryIds: function(photolist) {
    var ids = [];    

    for (var x=0; x<photolist.length; x++) {
      var slashIndex = photolist[x].lastIndexOf("/");
      var dotIndex = photolist[x].lastIndexOf(".");

      ids.push(photolist[x].substring(slashIndex + 1, dotIndex));
    }
    return ids;
  }
}
