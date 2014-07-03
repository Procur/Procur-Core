module.exports.waterlineHelper = {

  fixSupplierArrays: function(inObject) {
    var arrFields = ["acceptedCurrency","acceptedDeliveryTerms","acceptedPaymentTerms",
                     "language","locationCity","locationCountry","locationName",
                     "locationProvince","locationType","preferredBuyerLocation",
                     "preferredBuyerLanguage", "productCategory"];
    var modelKeys = Object.keys(inObject);
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

    newObject = sails.config.waterlineHelper.addNonArrayFieldsToObject(inObject, newObject, arrFields);
    return newObject;
  },

  fixBuyerArrays: function(inObject) {
    var arrFields = ["language","locationName","locationType","locationCity",
                     "locationProvince","locationCountry","preferredSupplierType",
                     "preferredSupplierLanguage","preferredSupplierLocation",
                     "acceptedCurrency","acceptedDeliveryTerms","acceptedPaymentTerms",
                     "productCategory"];
    var modelKeys = Object.keys(inObject);
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

    newObject = sails.config.waterlineHelper.addNonArrayFieldsToObject(inObject, newObject, arrFields);
    return newObject;
  },

  addNonArrayFieldsToObject: function(modelObj, viewObj, arrayFields) {
    var modelKeys = Object.keys(modelObj); 

    modelKeys.forEach(function(key) { 
      if (arrayFields.indexOf(key) === -1) {
        viewObj[key] = modelObj[key];
      }
    });

    return viewObj;
  }

  
}
