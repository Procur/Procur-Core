
/*

Custom Validation Rules

*/
jQuery.validator.addMethod("strongPassword", function(value, element, params) {
 var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
 return value === "" || regex.test(value);
}, jQuery.validator.format("Password must contain a number, a lowercase letter, and an uppercase letter."));


jQuery.validator.addMethod("internationalphanumeric+punct+whitespace", function(value, element, params) {
  //breakdown of complex regex:
  // allow all these symbols: A-Z a-z 0-9 . - , : + " ' ; & ` / ( )
  //    and \s is all whitespace characters
  // allow international characters: ^\x00-\x7F
  // require an internationalphanumeric: ([A-Za-z0-9]|[^\x00-\x7F])
   
  //Examples:
  //...       <-- invalid
  //A.        <-- valid
  var regex = /^(([A-Za-z0-9\s.\-,:+"';&`\/\(\)]|[^\x00-\x7F])*([A-Za-z0-9]|[^\x00-\x7F])([A-Za-z0-9\s.\-,:+"';&`\/\(\)]|[^\x00-\x7F])*)$/;
  return value === "" || regex.test(value);
}, jQuery.validator.format("International characters, simple punctuation, and spaces only."));


jQuery.validator.addMethod("numeric+whitespace", function(value, element, params) {
  var regex = /^[0-9 ]*$/;
  return value === "" || regex.test(value);
}, jQuery.validator.format("Numbers and spaces only."));


jQuery.validator.addMethod("decimal+number+whitespace", function(value, element, params) {
 var regex = /^[.0-9 ]*$/;
 return value === "" || regex.test(value);
}, jQuery.validator.format("Numeric or decimal formats and spaces only."));


jQuery.validator.addMethod("alphanumeric+punct+whitespace", function(value, element, params) {
  //breakdown of regex:
  // allow all these symbols: A-Z a-z 0-9 . - , : + " ' ; & ` / ( )
  //    and \s is all whitespace characters
  var regex = /^[A-Za-z0-9\s.\-,:+"';&`\/\(\)]*$/;
  return value === "" || regex.test(value);
}, jQuery.validator.format("Simple characters, punctuation, and spaces only."));

jQuery.validator.addMethod("companyHandleFormat", function(value, element, params) {
  //breakdown of regex:
  // allow only these symbols: A-Z a-z 0-9 _
  // and not just underscores.
  var regex = /^[A-Za-z0-9_]*[A-Za-z0-9][A-Za-z0-9_]*$/;
  return value === "" || regex.test(value);
}, jQuery.validator.format("Alphanumeric characters and underscores only."));

jQuery.validator.addMethod("companyNameFormat", function(value, element, params) {
  //IMPLEMENT ME
  return true;
}, jQuery.validator.format("International characters, simple punctuation, and spaces only."));



jQuery.validator.addMethod("uniqueCompanyName", function(value, element, params) {
 return !(companyNameTaken);
}, jQuery.validator.format("This company name is not unique."));

/*

Custom Validation Messages

*/
var checkBoxMsg = "Please select at least one option.";
var urlHintMsg = "Please enter a valid URL preceded by http://";
var dnsMsg = "Please enter a 9-digit DNS Number.";
var otherLocationsMsg = "Include the name, type, & country when providing a location.";

/*

Form Validation

*/

$('#registration-form').validate({
  rules: {
    firstName: {
      required: true,
      minlength: 1,
      maxlength: 100
    },
    lastName: {
      required: true,
      minlength: 1,
      maxlength: 100
    },
      email: {
      required: true,
      email: true,
      minlength: 1,
      maxlength: 100
    },
    password: {
      required: true,
      minlength: 8,
      strongPassword: true,
      maxlength: 50
    },
    passwordConfirm: {
      required: true,
      equalTo: "#regPassword"
    }
  }
});

$('#signup-form').validate({
  rules: {
    firstName: {
      required: true,
      minlength: 1,
      maxlength: 100
    },
    lastName: {
      required: true,
      minlength: 1,
      maxlength: 100
    },
    email: {
      required: true,
      email: true,
      minlength: 1,
      maxlength: 100
    },
    password: {
      required: true,
      minlength: 8,
      strongPassword: true,
      maxlength: 50
    },
    passwordConfirm: {
      required: true,
      equalTo: "#signUpPassword"
    }
  }
});

$('#login-form').validate({
  rules: {
    email: {
      required: true,
      email: true,
      minlength: 1,
      maxlength: 100
    },
    password: {
      required: true
    }
  }
});

$('#forgot-password-form').validate({
  rules: {
    email: {
      required: true,
      email: true
    }
  }
});


$('#select-handle-form').validate({
  rules: {
    handle: {
      required: true,
      minlength: 2,
      maxlength: 50,
      companyHandleFormat: true
    }
  }
});

$('#change-handle-form').validate({
  rules: {
    handle: {
      minlength: 2,
      maxlength: 50,
      companyHandleFormat: true
    }
  }
});

$('#basic-company-details-form').validate({
  rules: {
    companyName:{
      required: true,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 3,
      maxlength: 50,
      uniqueCompanyName: true
    },
    companyPhoneCountryCode:{
      required: true,
      "numeric+whitespace": true,
      minlength: 1,
      maxlength: 8
    },
    companyPhone: {
      required: true,
      "numeric+whitespace": true,
      minlength: 5,
      maxlength: 50
    },
    companyPhoneExt: {
      required: false,
      "numeric+whitespace": true,
      minlength: 1,
      maxlength: 10
    },
    /*companyFaxCountryCode: {
      required: true,
      "numeric+whitespace": true,
      minlength: 1,
      maxlength: 8
    },
    companyFax: {
      required: true,
      "numeric+whitespace": true,
      minlength: 5,
      maxlength: 50
    },
    companyFaxExt: {
      required: false,
      "numeric+whitespace": true,
      minlength: 1,
      maxlength: 10
    },*/
    companyEmail: {
      required: true,
      email: true,
      minlength: 4,
      maxlength: 50
    },
    companyWebsite: {
      required: false,
      url: true,
      minlength: 4,
      maxlength: 80
    },
    companyIndustry: {
      required: true
       //(provided) 
      //Note: the required rule will only work on select menus if the dummy data has value="".
      //Ex: <option value="">Select Employee Count</option>
    },
    companyAddress1: {
      required: true,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 1,
      maxlength: 80
    },
    companyAddress2: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 1,
      maxlength: 80     
    },
    companyCountry: {
      required: true
      //(provided) 
      //Note: the required rule will only work on select menus if the dummy data has value="".
      //Ex: <option value="">Select Employee Count</option>
    },
    companyProvince: {
      required: true
      //(provided) 
      //Note: the required rule will only work on select menus if the dummy data has value="".
      //Ex: <option value="">Select Employee Count</option>
    },
    companyPostalCode: {
      required: true,
      "alphanumeric+punct+whitespace" : true,
      minlength: 1,
      maxlength: 20
    },
    companyIsHq: {
      //(n/a)
    },
    hqAddress1: {
      required: true,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 1,
      maxlength: 80
    },
    hqAddress2: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 1,
      maxlength: 80
    },
    hqCountry: {
      required: true
      //(provided) 
      //Note: the required rule will only work on select menus if the dummy data has value="".
      //Ex: <option value="">Select Employee Count</option>
    },
    hqProvince: {
      required: true
      //(provided) 
      //Note: the required rule will only work on select menus if the dummy data has value="".
      //Ex: <option value="">Select Employee Count</option>
    },
    hqPostalCode: {
      required: true,
      "alphanumeric+punct+whitespace" : true,
      minlength: 1,
      maxlength: 20
    },
    companyEmployeeCount: {
      required: true
      //(provided) 
      //Note: the required rule will only work on select menus if the dummy data has value="".
      //Ex: <option value="">Select Employee Count</option>
    }
  },
  messages:{
    companyWebsite: {
      url: urlHintMsg
    }
  }
});


var buyerValidateObj = {
  rules: {
    logoUrl: {
      required: false
      //should be mistake-proof
    },
    dba: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 3,
          maxlength: 50
    },
    typeOfCompany: {
      required: true
      //(provided) 
      //Note: the required rule will only work on select menus if the dummy data has value="".
    },
    language: {
      required: true
      //multiple dropdowns with name="language". This requires at least one be selected.
      //(provided) 
      //Note: the required rule will only work on select menus if the dummy data has value="".
    },
    /*
    portCity: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 2,
          maxlength: 50
    },
    portProvince: {
      required: false
      //(provided) 
      //TODO: This should be a dropdown (and provided)
    },
    portCountry: {
      required: false
      //(provided) 
      //TODO: This should be a dropdown (and provided)
    },
    */
    buyerOtherLocationName: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 3,
      maxlength: 50
      //Buyer model says this is stored as an array, (length 1-100) but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    buyerOtherLocationType: {
      required: false
      // (provided)
      //Buyer model says this is stored as an array, (length 1-100) but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    buyerOtherLocationCountry: {
      required: false
      // (provided)
      //Buyer model says this is stored as an array, (length 1-100) but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    buyerOtherLocationProvince: {
      required: false
      // (provided)
      //Buyer model says this is stored as an array, (length 1-100) but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    buyerOtherLocationCity: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 2,
      maxlength: 50
      //Buyer model says this is stored as an array, (length 1-100) but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    /*
    acceptedDeliveryTerms: {
      required: true
      //multiple checkboxes with name="acceptedDeliveryTerms". This requires at least one be checked.
    },
    */
    acceptedCurrency: {
      required: true
      //multiple checkboxes with name="acceptedCurrency". This requires at least one be checked.
    },
    acceptedPaymentTerms: {
      required: true
      //multiple checkboxes with name="acceptedPaymentTerms". This requires at least one be checked.
    },
    preferredSupplierType: {
      required: true
      // (provided)
    },
    preferredSupplierLocation: {
      required: false
      // (provided)
      //Buyer model says this is stored as an array (length 1-100), but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    preferredSupplierLanguage: {
      required: false
      // (provided)
      //Buyer model says this is stored as an array (length 1-100), but it is a single dropdown in the UI.
      //TODO: ask about this.
    }
  },
  messages:{
    /*
    acceptedDeliveryTerms: {
      required: checkBoxMsg
    },
    */
    acceptedCurrency: {
      required: checkBoxMsg
    },
    acceptedPaymentTerms: {
      required: checkBoxMsg
    }
  }
};

// Setup the default validation rules
$('#buyer-wizard-form').validate(buyerValidateObj);

var updateBuyerOtherLocationRules = function () {
  // Get the jQuery validation plugin's settings
  var settings = $('#buyer-wizard-form').validate().settings;

  var flag = $('#buyerOtherLocationName').val()!=""|| $('#buyerOtherLocationType').val()!="" ||
  $('#buyerOtherLocationCountry').val()!="" || $('#buyerOtherLocationCity').val()!="";

  $.extend(true, settings, {
    rules: {
      "buyerOtherLocationType": {
        required: flag
      },
      "buyerOtherLocationName": {
        required: flag
      },
      "buyerOtherLocationCountry": {
        required: flag
      }
    }
  });
};

$('#buyerOtherLocationName').change(function () {
  updateBuyerOtherLocationRules();
});

$('#buyerOtherLocationType').change(function () {
  updateBuyerOtherLocationRules();
});

$('#buyerOtherLocationCountry').change(function () {
  updateBuyerOtherLocationRules();
});

$('#buyerOtherLocationCity').change(function () {
  updateBuyerOtherLocationRules();
});



var supplierValidateObj = {
  rules: {
    logoUrl: {
      required: false
      //should be mistake-proof
    },
    dba: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 3,
      maxlength: 50
    },
    typeOfCompany: {
      required: true
      //(provided) 
      //Note: the required rule will only work on select menus if the dummy data has value="".
    },
    language: {
      required: true
      //multiple dropdowns with name="language". This requires at least one be selected.
      //(provided) 
      //Note: the required rule will only work on select menus if the dummy data has value="".
    },
    nearestPortCity: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 2,
      maxlength: 50
    },
    nearestPortProvince: {
      required: false
      //(provided) 
      //TODO: This should be a dropdown (and provided)
    },
    nearestPortCountry: {
      required: false
      //(provided) 
      //TODO: This should be a dropdown (and provided)
    },
    supplierOtherLocationName: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 3,
      maxlength: 50
      //Buyer model says this is stored as an array, (length 1-100) but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    supplierOtherLocationType: {
      required: false
      // (provided)
      //Buyer model says this is stored as an array, (length 1-100) but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    supplierOtherLocationCountry: {
      required: false
      // (provided)
      //Buyer model says this is stored as an array, (length 1-100) but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    supplierOtherLocationProvince: {
      required: false
      // (provided)
      //Buyer model says this is stored as an array, (length 1-100) but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    supplierOtherLocationCity: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 2,
      maxlength: 50
      //Buyer model says this is stored as an array, (length 1-100) but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    annualProductionVolume:{
      required: true
      // (provided)
    },
    privateLabeler: {
      //(n/a)
    },
    acceptedDeliveryTerms: {
      required: true
      // (provided)
      //multiple checkboxes with name="acceptedDeliveryTerms". This requires at least one be checked.
    },
    acceptedCurrency: {
      required: true
      // (provided)
      //multiple checkboxes with name="acceptedCurrency". This requires at least one be checked.
    },
    acceptedPaymentTerms: {
      required: true
      // (provided)
      //multiple checkboxes with name="acceptedPaymentTerms". This requires at least one be checked.
    },
    preferredBuyerType: {
      required: true
      // (provided)
    },
    preferredBuyerLocation: {
      required: false
      // (provided)
      //Buyer model says this is stored as an array (length 1-100), but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    preferredBuyerLanguage: {
      required: false
      // (provided)
      //Buyer model says this is stored as an array (length 1-100), but it is a single dropdown in the UI.
      //TODO: ask about this.
    }
    /*
      TODO: Product Specialties (At least one required.)
    */
  },
  messages:{
    acceptedDeliveryTerms: {
      required: checkBoxMsg
    },
    acceptedCurrency: {
      required: checkBoxMsg
    },
    acceptedPaymentTerms: {
      required: checkBoxMsg
    },
    supplierOtherLocationType: {
    	required: otherLocationsMsg
    },
    supplierOtherLocationName: {
    	required: otherLocationsMsg
    },
    supplierOtherLocationCountry: {
    	required: otherLocationsMsg
    }
  }
};

  // Setup the default validation rules
$('#supplier-wizard-form').validate(supplierValidateObj);

/*
	Update if any of the other location fields are filled
*/
var updateOtherLocationRules = function () {
  // Get the jQuery validation plugin's settings
  var settings = $('#supplier-wizard-form').validate().settings;

  var flag = $('#supplierOtherLocationName').val()!=""|| $('#supplierOtherLocationType').val()!="" ||
  $('#supplierOtherLocationCountry').val()!="" || $('#supplierOtherLocationCity').val()!="";

  $.extend(true, settings, {
    rules: {
      "supplierOtherLocationType": {
        required: flag
      },
      "supplierOtherLocationName": {
        required: flag
      },
      "supplierOtherLocationCountry": {
        required: flag
      }
    }
  });
};

$('#supplierOtherLocationName').change(function () {
	updateOtherLocationRules();
});

$('#supplierOtherLocationType').change(function () {
	updateOtherLocationRules();
});

$('#supplierOtherLocationCountry').change(function () {
	updateOtherLocationRules();
});

$('#supplierOtherLocationCity').change(function () {
	updateOtherLocationRules();
});




$('#buyer-update-form').validate({
  rules: {
    logoUrl: {
      required: false
      //should be mistake-proof
    },
    dba: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 3,
      maxlength: 50
    },
    typeOfCompany: {
      required: true
      //(provided) 
      //Note: the required rule will only work on select menus if the dummy data has value="".
    },
    language: {
      required: true
      //multiple dropdowns with name="language". This requires at least one be selected.
      //(provided) 
      //Note: the required rule will only work on select menus if the dummy data has value="".
    },
    nearestPortCity: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 2,
      maxlength: 50
    },
    nearestPortProvince: {
      required: false
      //(provided) 
      //TODO: This should be a dropdown (and provided)
    },
    nearestPortCountry: {
      required: false
      //(provided) 
      //TODO: This should be a dropdown (and provided)
    },
    locationName: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 3,
      maxlength: 50
      //Buyer model says this is stored as an array, (length 1-100) but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    locationType: {
      required: false
      // (provided)
      //Buyer model says this is stored as an array, (length 1-100) but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    locationCountry: {
      required: false
      // (provided)
      //Buyer model says this is stored as an array, (length 1-100) but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    locationProvince: {
      required: false
      // (provided)
      //Buyer model says this is stored as an array, (length 1-100) but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    locationCity: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 2,
      maxlength: 50
      //Buyer model says this is stored as an array, (length 1-100) but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    acceptedDeliveryTerms: {
      required: true
      //multiple checkboxes with name="acceptedDeliveryTerms". This requires at least one be checked.
    },
    acceptedCurrency: {
      required: true
      //multiple checkboxes with name="acceptedCurrency". This requires at least one be checked.
    },
    acceptedPaymentTerms: {
      required: true
      //multiple checkboxes with name="acceptedPaymentTerms". This requires at least one be checked.
    },
    preferredSupplierType: {
      required: true
      // (provided)
    },
    preferredSupplierCountry: {
      required: false
      // (provided)
      //Buyer model says this is stored as an array (length 1-100), but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    preferredSupplierLanguage: {
      required: false
      // (provided)
      //Buyer model says this is stored as an array (length 1-100), but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    facebook:{
      required:false,
      url: true,
      maxlength: 50 //*possibly too short?
    },
    twitter:{
      required:false,
      url: true,
      maxlength: 50 //*possibly too short?
    },
    pinterest:{
      required:false,
      url: true,
      maxlength: 50 //*possibly too short?
    },
    tumblr:{
      required:false,
      url: true,
      maxlength: 50 //*possibly too short?
    },
    linkedin:{
      required:false,
      url: true,
      maxlength: 50 //*possibly too short?
    },
    instagram:{
      required:false,
      url: true,
      maxlength: 50 //*possibly too short?
    },
    google:{
      required:false,
      url:true,
      maxlength: 50 //*possibly too short?
    },
    dunsNumber:{
      required:false,
      digits: true,
      minlength: 9,
      maxlength: 9
    },
    contactName:{
      required:false,
      "internationalphanumeric+punct+whitespace": true
    },
    contactPosition:{
      required:false,
      "internationalphanumeric+punct+whitespace": true,
      maxlength: 50
    },
    contactEmail:{
      required:false,
      email:true,
      minlength:4,
      maxlength: 50
    },
    companyDescription:{
      required:false,
      maxlength: 5000
    },
    environmentalSustainability:{
      required:false,
      maxlength: 2000
    },
    qualitySourcing:{
      required:false,
      maxlength: 2000
    },
    workplaceSafety:{
      required:false,
      maxlength: 2000
    },
    laborEducationTraining:{
      required:false,
      maxlength: 2000
    },
    reinvestment:{
      required:false,
      maxlength: 2000
    },
    productsOfInterest:{
      required:false,
      maxlength: 2000
    }
  },
  messages:{
    acceptedDeliveryTerms: {
      required: checkBoxMsg
    },
    acceptedCurrency: {
      required: checkBoxMsg
    },
    acceptedPaymentTerms: {
      required: checkBoxMsg
    },
    facebook:{
      url: urlHintMsg
    },
    twitter:{
      url: urlHintMsg
    },
    pinterest:{
      url: urlHintMsg
    },
    tumblr:{
      url: urlHintMsg
    },
    linkedin:{
      url: urlHintMsg
    },
    instagram:{
      url: urlHintMsg
    },
    google:{
      url: urlHintMsg
    },
    dunsNumber:{
      digits: dnsMsg,
      minlength: dnsMsg,
      maxlength: dnsMsg
    },
  }
});


$('#supplier-update-form').validate({
  rules: {
    logoUrl: {
      required: false
      //should be mistake-proof
    },
    dba: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 3,
          maxlength: 50
    },
    typeOfCompany: {
      required: true
      //(provided) 
      //Note: the required rule will only work on select menus if the dummy data has value="".
    },
    language: {
      required: true
      //multiple dropdowns with name="language". This requires at least one be selected.
      //(provided) 
      //Note: the required rule will only work on select menus if the dummy data has value="".
    },
    nearestPortCity: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 2,
          maxlength: 50
    },
    nearestPortProvince: {
      required: false
      //(provided) 
      //TODO: This should be a dropdown (and provided)
    },
    nearestPortCountry: {
      required: false
      //(provided) 
      //TODO: This should be a dropdown (and provided)
    },
    locationName: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 3,
      maxlength: 50
      //Buyer model says this is stored as an array, (length 1-100) but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    locationType: {
      required: false
      // (provided)
      //Buyer model says this is stored as an array, (length 1-100) but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    locationCountry: {
      required: false
      // (provided)
      //Buyer model says this is stored as an array, (length 1-100) but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    locationProvince: {
      required: false
      // (provided)
      //Buyer model says this is stored as an array, (length 1-100) but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    locationCity: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 2,
      maxlength: 50
      //Buyer model says this is stored as an array, (length 1-100) but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    annualSalesValue: {
      required: true
      //(provided)
      //Note: equivalent to annualProductionVolume
    },
    acceptedDeliveryTerms: {
      required: true
      //multiple checkboxes with name="acceptedDeliveryTerms". This requires at least one be checked.
    },
    acceptedCurrency: {
      required: true
      //multiple checkboxes with name="acceptedCurrency". This requires at least one be checked.
    },
    acceptedPaymentTerms: {
      required: true
      //multiple checkboxes with name="acceptedPaymentTerms". This requires at least one be checked.
    },
    preferredBuyerType: {
      required: true
      // (provided)
    },
    preferredBuyerCountry: {
      required: false
      // (provided)
      //Buyer model says this is stored as an array (length 1-100), but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    preferredBuyerLanguage: {
      required: false
      // (provided)
      //Buyer model says this is stored as an array (length 1-100), but it is a single dropdown in the UI.
      //TODO: ask about this.
    },
    privateLabeler: {
      //(n/a)
    },
    facebook:{
      required:false,
      url: true,
      maxlength: 50 //*possibly too short?
    },
    twitter:{
      required:false,
      url: true,
      maxlength: 50 //*possibly too short?
    },
    pinterest:{
      required:false,
      url: true,
      maxlength: 50 //*possibly too short?
    },
    tumblr:{
      required:false,
      url: true,
      maxlength: 50 //*possibly too short?
    },
    linkedin:{
      required:false,
      url: true,
      maxlength: 50 //*possibly too short?
    },
    instagram:{
      required:false,
      url: true,
      maxlength: 50 //*possibly too short?
    },
    google:{
      required:false,
      url:true,
      maxlength: 50 //*possibly too short?
    },
    dunsNumber:{
      required:false,
      digits: true,
      minlength: 9,
          maxlength: 9
    },
    contactName:{
      required:false,
      "internationalphanumeric+punct+whitespace": true
    },
    contactPosition:{
      required:false,
      "internationalphanumeric+punct+whitespace": true,
      maxlength: 50
    },
    contactEmail:{
      required:false,
      email:true,
      minlength:4,
      maxlength: 50
    },
    companyDescription:{
      required:false,
      maxlength: 5000
    },
    environmentalSustainability:{
      required:false,
      maxlength: 2000
    },
    qualitySourcing:{
      required:false,
      maxlength: 2000
    },
    workplaceSafety:{
      required:false,
      maxlength: 2000
    },
    laborEducationTraining:{
      required:false,
      maxlength: 2000
    },
    reinvestment:{
      required:false,
      maxlength: 2000
    }
  },
  messages:{
    acceptedDeliveryTerms: {
      required: checkBoxMsg
    },
    acceptedCurrency: {
      required: checkBoxMsg
    },
    acceptedPaymentTerms: {
      required: checkBoxMsg
    },
    facebook:{
      url: urlHintMsg
    },
    twitter:{
      url: urlHintMsg
    },
    pinterest:{
      url: urlHintMsg
    },
    tumblr:{
      url: urlHintMsg
    },
    linkedin:{
      url: urlHintMsg
    },
    instagram:{
      url: urlHintMsg
    },
    google:{
      url: urlHintMsg
    },
    dunsNumber:{
      digits: dnsMsg,
      minlength: dnsMsg,
      maxlength: dnsMsg
    },
  }
});


$('#user-update-form').validate({
  rules: {
    firstName: {
      required: true,
      minlength: 1,
      maxlength: 100
    },
    lastName: {
      required: true,
      minlength: 1,
      maxlength: 100
    },
      email: {
      required: true,
      email: true,
      minlength: 1,
      maxlength: 100
    },
    emailConfirm: {
      required: true,
      equalTo: "#updateEmail"
    },
    jobTitle: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 1,
      maxlength: 100
    },
    image: {
      //n/a
    }
  }
});


$('#password-update-form').validate({
  rules: {
    password: {
      required: true,
      minlength: 8,
      strongPassword: true,
      maxlength: 50
    },
    passwordConfirm: {
      required: true,
      equalTo: "#newPassword"
    }
  }
});
