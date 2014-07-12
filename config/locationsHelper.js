module.exports.locationsHelper = {

  parseLocations: function(locations, user) { 
    var viewLocations = {};
    var numOfCompanyLocations = locations["company"].length;
    
    viewLocations = sails.config.locationsHelper.initializeViewLocations(user);

    for (var y = 0; y < numOfCompanyLocations; y++) {
      numOfCompanyLocations === 1 ? viewLocations["showHq"] = false : viewLocations["showHq"] = true;

      if (locations["company"][y].hasOwnProperty("addressLine1") && locations["company"][y].isHq === false) {
        viewLocations["company-notHq"].push(locations["company"][y]);
      }
      else if (locations["company"][y].hasOwnProperty("addressLine1") && locations["company"][y].isHq === true) {
        viewLocations["company-isHq"] = locations["company"][y];
      }
    }

    return viewLocations;
  },

  initializeViewLocations: function(user) {
    var viewLocations = {};
    viewLocations["company-notHq"] = [];
    viewLocations["company-isHq"] = {};

    return viewLocations;
  }

};
