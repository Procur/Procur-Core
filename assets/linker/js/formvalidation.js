
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

jQuery.validator.addMethod("alphanumeric", function(value, element, params) {
  var regex = /^[0-9A-Za-z]*$/;
  return value === "" || regex.test(value);
}, jQuery.validator.format("Numbers and letters only."));

jQuery.validator.addMethod("phoneNumberFormat", function(value, element, params) {
  var regex = /^[0-9 \(\)\-\#]*$/;
  return value === "" || regex.test(value);
}, jQuery.validator.format("Digits and phone number punctuation only."));


jQuery.validator.addMethod("decimal+number+whitespace", function(value, element, params) {
 var regex = /^[.0-9 ]*$/;
 return value === "" || regex.test(value);
}, jQuery.validator.format("Numeric or decimal formats and spaces only."));

jQuery.validator.addMethod("complete_url", function(val, elem) {
    // if no url, don't do anything
    if (val.length == 0) { return true; }

    // if user has not entered http:// https:// or ftp:// assume they mean http://
    if(!/^(https?|ftp):\/\//i.test(val)) {
        val = 'http://'+val; // set both the value
        $(elem).val(val); // also update the form element
    }
    // now check if valid url
    // http://docs.jquery.com/Plugins/Validation/Methods/url
    // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
    return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&amp;'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(val);
});

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

jQuery.validator.addMethod("socialMediaHandleFormat", function(value, element, params) {
  var regex = /^[\S]*$/;
  return value === "" || regex.test(value);
}, jQuery.validator.format("No whitespace please."));

jQuery.validator.addMethod("companyNameFormat", function(value, element, params) {
  //IMPLEMENT ME
  return true;
}, jQuery.validator.format("International characters, simple punctuation, and spaces only."));

jQuery.validator.addMethod("uniqueCompanyName", function(value, element, params) {
  return !(companyNameTaken);
}, jQuery.validator.format("This company name is not available."));

jQuery.validator.addMethod("uniqueCompanyHandle", function(value, element, params) {
  return !(companyHandleTaken);
}, jQuery.validator.format("This company handle is not available."));

/*
jQuery.validator.addMethod("uniqueEmailAddress", function(value, element, params) {
  var result;
  $.get('/checkEmailExists', { email: value }).done(function(data) {
    result = data;
  });
  return !(result);
}, jQuery.validator.format("This email address is not available."));
*/

jQuery.validator.addMethod("actualCategoryOption", function(value, element, params) {
  if (value==""){return true;}

  var result = false;
  $.each(autocompleteCategoriesList, function(index, category){
    if (value==category){
      result = true;
    }
  });
  return result;
}, jQuery.validator.format("Please choose an option provided."));

/*

Custom Validation Messages

*/
var checkBoxMsg = "Please select at least one option.";
var urlHintMsg = "Please enter a valid URL.";
var dnsMsg = "Please enter a 9-digit DNS Number.";
var otherLocationsMsg = "Include the name, type, & country when providing a location.";
var agreeTermsMsg = "You must read & agree to all of the above.";
var responsiblePartyMsg = "You must assert the above.";
var cageMsg = "Please enter a 5 characters.";

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
  },
  messages:{
    passwordConfirm: {
      equalTo: "Passwords do not match."
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
  },
  messages:{
    passwordConfirm: {
      equalTo: "Passwords do not match."
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

$('#reset-password-form').validate({
  rules: {  
    password: {
      required: true,
      minlength: 8,
      strongPassword: true,
      maxlength: 50
    },
    confirmPassword: {
      required: true,
      equalTo: "#resetPasswordChoice"
    }
  },
  messages:{
    confirmPassword: {
      equalTo: "Passwords do not match."
    }
  }
});

$('#select-handle-form').validate({
  rules: {
    handle: {
      required: true,
      minlength: 2,
      maxlength: 50,
      companyHandleFormat: true,
      uniqueCompanyHandle: true
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
      "phoneNumberFormat": true,
      minlength: 1,
      maxlength: 8
    },
    companyPhone: {
      required: true,
      "phoneNumberFormat": true,
      minlength: 5,
      maxlength: 50
    },
    companyPhoneExt: {
      required: false,
      "phoneNumberFormat": true,
      minlength: 1,
      maxlength: 10
    },
    companyEmail: {
      required: true,
      email: true,
      minlength: 4,
      maxlength: 50
    },
    companyWebsite: {
      required: false,
      "complete_url": true,
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
    companyCity:{
      "internationalphanumeric+punct+whitespace": true,
      required: true,
      minlength: 1,
      maxlength: 100
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
    },
    agreeTerms: {
      required: true
    },
    responsibleParty: {
      required: true
    }
  },
  messages:{
    companyWebsite: {
      "complete_url": urlHintMsg
    },
    agreeTerms: {
      required: agreeTermsMsg
    },
    responsibleParty: {
      required: responsiblePartyMsg
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
    },
    autocomplete: {
      actualCategoryOption: true
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
    },
    autocompleteReq: {
      required: true,
      actualCategoryOption: true
    },
    autocomplete: {
      actualCategoryOption: true
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
      required: false,
      email: true,
      //uniqueEmailAddress: true,
      minlength: 1,
      maxlength: 100
    },
    emailConfirm: {
      required: function(element){
        return $('#updateEmail').val()!=="";
      },
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
  },
  messages:{
    emailConfirm:{
      equalTo: "Emails do not match."
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
  },
  messages:{
    passwordConfirm: {
      equalTo: "Passwords do not match."
    }
  }
});

$('#subscriberForm').validate({
  rules:{
    subscriberEmail: {
      required: true,
      email:true,
      minlength:4,
      maxlength: 50
    }
  },
  messages:{
    subscriberEmail: {
      required: "Enter your email to join our mailing list."
    }
  }
});

$('#contactForm').validate({
  rules:{
    email: {
      required: true,
      email:true,
      minlength:4,
      maxlength: 50
    },
    content : {
      required: true
    }
  }
});


/*

Company Update Validation

*/
$('#companyDetailsForm').validate({
  rules: {
    name:{
      required: true,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 3,
      maxlength: 50,
      uniqueCompanyName: true
    },
    phoneNumberCountryCode:{
      required: true,
      "phoneNumberFormat": true,
      minlength: 1,
      maxlength: 8
    },
    phoneNumber: {
      required: true,
      "phoneNumberFormat": true,
      minlength: 5,
      maxlength: 50
    },
    phoneExtension: {
      required: false,
      "phoneNumberFormat": true,
      minlength: 1,
      maxlength: 10
    },
    faxCountryCode: {
      required: false,
      "phoneNumberFormat": true,
      minlength: 1,
      maxlength: 8
    },
    faxNumber: {
      required: false,
      "phoneNumberFormat": true,
      minlength: 5,
      maxlength: 50
    },
    faxExtension: {
      required: false,
      "phoneNumberFormat": true,
      minlength: 1,
      maxlength: 10
    },
    email: {
      required: true,
      email: true,
      minlength: 4,
      maxlength: 50
    },
    website: {
      required: false,
      "complete_url": true,
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
    employeeCount: {
      required: true
      //(provided) 
      //Note: the required rule will only work on select menus if the dummy data has value="".
      //Ex: <option value="">Select Employee Count</option>
    }
  },
  messages:{
    website: {
      "complete_url": urlHintMsg
    }
  }
});

$('#buyerInformationForm').validate({
  rules: {
    dbaName: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 3,
      maxlength: 50
    },
    language: {
      required: true //(provided)
    },
    acceptedCurrency: {
      required: true
    },
    acceptedPaymentTerms: {
      required: true
    },
    acceptedDeliveryTerms: {
      required: false
    },
    typeOfCompany: {
      required: true //(provided)
    },
    contactName: {
      required:false,
      "internationalphanumeric+punct+whitespace": true
    },
    contactPosition: {
      required:false,
      "internationalphanumeric+punct+whitespace": true,
      maxlength: 50
    },
    contactEmail: {
      required:false,
      email:true,
      minlength:4,
      maxlength: 50
    },
    dunsNumber: {
      required:false,
      digits: true,
      minlength: 9,
      maxlength: 9
    },
    locationName: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 3,
      maxlength: 50
    },
    locationType: {
      required: false // (provided)
    },
    locationCountry: {
      required: false // (provided)
    },
    locationProvince: {
      required: false // (provided)
    },
    locationCity: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 2,
      maxlength: 50
    },
    portCity: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 2,
      maxlength: 50
    },
    portCountry: {
      required: false // (provided)
    },
    portProvince: {
      required: false // (provided)
    },
    autocomplete: {
      actualCategoryOption: true
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
    dunsNumber:{
      digits: dnsMsg,
      minlength: dnsMsg,
      maxlength: dnsMsg
    }
  }
});


$("#buyerSocialOutletsForm").validate({
  rules: {
    facebook:{
      required:false,
      socialMediaHandleFormat: true,
      maxlength: 50 //*possibly too short?
    },
    twitter:{
      required:false,
      socialMediaHandleFormat: true,
      maxlength: 50 //*possibly too short?
    },
    pinterest:{
      required:false,
      socialMediaHandleFormat: true,
      maxlength: 50 //*possibly too short?
    },
    tumblr:{
      required:false,
      socialMediaHandleFormat: true,
      maxlength: 50 //*possibly too short?
    },
    linkedin:{
      required:false,
      socialMediaHandleFormat: true,
      maxlength: 50 //*possibly too short?
    },
    instagram:{
      required:false,
      socialMediaHandleFormat: true,
      maxlength: 50 //*possibly too short?
    },
    google:{
      required:false,
      socialMediaHandleFormat:true,
      maxlength: 50 //*possibly too short?
    },
  }
});

$("#buyerDescriptionsForm").validate({ //TO-DO: Needs a custom labeling, because labels aren't displaying.
  rules: {
    companyDescription: {
      maxlength: 5000
    },
    environmentalSustainability: {
      maxlength: 2000
    },
    qualitySourcing: {
      maxlength: 2000
    },
    workplaceSafety: {
      maxlength: 2000
    },
    laborEducationTraining: {
      maxlength: 2000
    },
    reinvestment: {
      maxlength: 2000
    }
  }
});

$('#supplierInformationForm').validate({//TO-DO: WHY DOESNT THIS WORK??
  rules: {
    dbaName: {
      required: false,
      "internationalphanumeric+punct+whitespace": true,
      minlength: 3,
      maxlength: 50
    },
    language: {
      required: true //(provided)
    },
    acceptedCurrency: {
      required: false
    },
    acceptedPaymentTerms: {
      required: true
    },
    acceptedDeliveryTerms: {
      required: false
    },
    typeOfCompany: {
      required: true //(provided)
    },
    contactName: {
      required:false,
      "internationalphanumeric+punct+whitespace": true
    },
    contactPosition: {
      required:false,
      "internationalphanumeric+punct+whitespace": true,
      maxlength: 50
    },
    contactEmail: {
      required:false,
      email:true,
      minlength:4,
      maxlength: 50
    },
    dunsNumber: {
      required:false,
      digits: true,
      minlength: 9,
      maxlength: 9
    },
    autocompleteReq: {
      required: true,
      actualCategoryOption: true
    },
    autocomplete: {
      actualCategoryOption: true
    },
    cageCode: {
      alphanumeric: true,
      minlength: 5,
      maxlength: 5
    }
  },
  messages:{
    cageCode: {
      minlength: cageMsg,
      maxlength: cageMsg
    },
    acceptedDeliveryTerms: {
      required: checkBoxMsg
    },
    acceptedCurrency: {
      required: checkBoxMsg
    },
    acceptedPaymentTerms: {
      required: checkBoxMsg
    },
    dunsNumber:{
      digits: dnsMsg,
      minlength: dnsMsg,
      maxlength: dnsMsg
    }
  }
});


$("#supplierDescriptionsForm").validate({ //TO-DO: Needs a custom labeling, because labels aren't displaying.
  rules: {
    companyDescription: {
      maxlength: 5000
    },
    environmentalSustainability: {
      maxlength: 2000
    },
    qualitySourcing: {
      maxlength: 2000
    },
    workplaceSafety: {
      maxlength: 2000
    },
    laborEducationTraining: {
      maxlength: 2000
    },
    reinvestment: {
      maxlength: 2000
    }
  }
});


$("#supplierSocialOutletsForm").validate({
  rules: {
    facebook:{
      required:false,
      socialMediaHandleFormat: true,
      maxlength: 50 //*possibly too short?
    },
    twitter:{
      required:false,
      socialMediaHandleFormat: true,
      maxlength: 50 //*possibly too short?
    },
    pinterest:{
      required:false,
      socialMediaHandleFormat: true,
      maxlength: 50 //*possibly too short?
    },
    tumblr:{
      required:false,
      socialMediaHandleFormat: true,
      maxlength: 50 //*possibly too short?
    },
    linkedin:{
      required:false,
      socialMediaHandleFormat: true,
      maxlength: 50 //*possibly too short?
    },
    instagram:{
      required:false,
      socialMediaHandleFormat: true,
      maxlength: 50 //*possibly too short?
    },
    google:{
      required:false,
      socialMediaHandleFormat:true,
      maxlength: 50 //*possibly too short?
    },
  }
});


