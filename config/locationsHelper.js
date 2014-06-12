module.exports.locationsHelper = {

  parseLocations: function(locations, user) { 
    var viewLocations = {};
    var numOfUserLocations = locations[user].length;
    var numOfCompanyLocations = locations["company"].length;
    
    viewLocations = sails.config.locationsHelper.initializeViewLocations(user);

    for (var x = 0; x < numOfUserLocations; x++) {
      if (locations[user][x].type === "port") {
        viewLocations[user + "-isPort"].push(locations[user][x]);
      }
      else {
        viewLocations[user + "-notPort"].push(locations[user][x]);
      }
    }

    for (var y = 0; y < numOfCompanyLocations; y++) {
      if (y === 0 && locations["company"][y].isHq === true) { viewLocations["showHq"] = false; }
      if (y === 0 && locations["company"][y].isHq === false) { viewLocations["showHq"] = true; }

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
    viewLocations[user + "-notPort"] = [];
    viewLocations[user + "-isPort"] = [];
    viewLocations["company-notHq"] = [];
    viewLocations["company-isHq"] = {};

    return viewLocations;
  }

}