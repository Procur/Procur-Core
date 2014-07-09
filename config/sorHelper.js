module.exports.sorHelper = {
  appendViewFields: function(inObject) {
    SOR_FIELDS = ["environmentalSustainability",
                 "qualitySourcing",
                 "workplaceSafety",
                 "laborEducationTraining",
                 "reinvestment"];
    sorHelper = sails.config.sorHelper;
    
    inObject = sorHelper.addViewTabStatus(inObject);
    inObject["showSORTab"] === true ? inObject = sorHelper.fieldsToShow(inObject) : inObject["sorViewFields"] = [];

    return inObject;
  },
  
  addViewTabStatus: function(inData) {
    
    var valuesExist = sorHelper.hasAnyValues(inData);
    valuesExist === true ? inData["showSORTab"] = true : inData["showSORTab"] = false;

    return inData;
  },

  hasAnyValues: function(inData) {
    var hasAnyValues = false;
    
    SOR_FIELDS.forEach(function(field){
      inData[field] === undefined ? hasAnyValues = false : hasAnyValues = true; 
    });

    return hasAnyValues;
  },

  fieldsToShow: function(inData) {
    var fieldsToShow = [];

    SOR_FIELDS.forEach(function(field) {
      if (inData[field] !== undefined) { fieldsToShow.push(field); }
    });

    inData["sorViewFields"] = fieldsToShow;
    return inData;
  }

}
