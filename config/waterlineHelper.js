module.exports.waterlineHelper = {

  fixSupplierArrays: function(inObject) {
    var arrFields = ["acceptedCurrency","acceptedDeliveryTerms","acceptedPaymentTerms",
                     "language","locationCity","locationCountry","locationName",
                     "locationProvince","locationType","preferredBuyerCountry",
                     "preferredBuyerLanguage"];
    var newObject = {};

    for (var x = 0; x < arrFields.length; x++) {
      if (inObject[arrFields[x]][0][0].length == 1) {
        newObject[arrFields[x]] = [];
        newObject[arrFields[x]].push(inObject[arrFields[x]][0]);
      }
      else {
        for (var y = 0; y < inObject[arrFields[x]][0].length; y++) {
          if (y == 0) { newObject[arrFields[x]] = []; }
          newObject[arrFields[x]].push(inObject[arrFields[x]][0][y]);
        }
      }
    }
    return newObject;
  }
  
}