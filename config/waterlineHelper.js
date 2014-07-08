module.exports.waterlineHelper = {

  fixSupplierArrays: function(inObject) {
    var arrFields = ["acceptedCurrency","acceptedDeliveryTerms","acceptedPaymentTerms",
                     "language","locationCity","locationCountry","locationName",
                     "locationProvince","locationType","preferredBuyerLocation",
                     "preferredBuyerLanguage", "productCategory"];
    var newObject = {};

    for (var x = 0; x < arrFields.length; x++) {
      if (inObject[arrFields[x]] === undefined) {
        newObject[arrFields[x]] = new Array();
        continue;
      }
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
  },

  fixBuyerArrays: function(inObject) {
    var arrFields = ["language","locationName","locationType","locationCity",
                     "locationProvince","locationCountry","preferredSupplierType",
                     "preferredSupplierLanguage","preferredSupplierLocation",
                     "acceptedCurrency","acceptedDeliveryTerms","acceptedPaymentTerms",
                     "productCategory"];
    var newObject = {};

    for (var x = 0; x < arrFields.length; x++) {
      if (inObject[arrFields[x]] === undefined) {
        newObject[arrFields[x]] = new Array();
        continue;
      }
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

};
