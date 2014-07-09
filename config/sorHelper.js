module.exports.sorHelper = {

  appendViewFields: function(inObject) {
    sorHelper = sails.config.sorHelper;
    sorHelper.initializeVars();
    
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
    
    SOR_KEYS.forEach(function(field){
      inData[field] === undefined ? hasAnyValues = false : hasAnyValues = true; 
    });

    return hasAnyValues;
  },

  fieldsToShow: function(inData) {
    var fieldsToShow = {};

    SOR_KEYS.forEach(function(field) {
      if (inData[field] !== undefined) { fieldsToShow[field] = SOR_FIELDS[field]; }
    });

    inData["sorViewFields"] = fieldsToShow;
    return inData;
  },

  initializeVars: function() {
    SOR_FIELDS = {
      "environmentalSustainability": "Environmental Sustainability",
      "qualitySourcing": "Quality Sourcing",
      "workplaceSafety": "Workplace Safety",
      "laborEducationTraining": "Labor, Education, and Training",
      "reinvestment": "Reinvestment"
    }
    SOR_KEYS = Object.keys(SOR_FIELDS);
  }

}
