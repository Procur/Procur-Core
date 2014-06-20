
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
 	//  	and \s is all whitespace characters
 	// allow international characters: ^\x00-\x7F
 	// require an internationalphanumeric: ([A-Za-z0-9]|[^\x00-\x7F])
 	 
 	//Examples:
 	//...				<-- invalid
 	//A.				<-- valid
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
 	//  	and \s is all whitespace characters
 	var regex = /^[A-Za-z0-9\s.\-,:+"';&`\/\(\)]*$/;
 	return value === "" || regex.test(value);
}, jQuery.validator.format("Simple characters, punctuation, and spaces only."));



/*

Form Validation

*/
$('#registration-form').validate({
	rules: {
	    firstName: {
	        required: true
	    },
		lastName: {
			required: true
		},
	    email: {
	  		required: true,
	 		email: true
		},
		emailConfirm: {
	  		required: true,
	 		equalTo: "#regEmail"
		},
		password: {
			required: true,
			minlength: 8,
			strongPassword: true
		},
		passwordConfirm: {
			required: true,
			minlength: 8,
			equalTo: "#regPassword"
	    }
	}
});


$('#basic-company-details-form').validate({
	rules: {
		companyName:{
			required: true,
			"internationalphanumeric+punct+whitespace": true,
			minlength: 3,
			maxlength: 50
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
 		companyFaxCountryCode: {
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
 		},
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
 			url: "Please enter a valid URL preceded by http://",
 		}
	}
});


$('#buyer-wizard-form').validate({
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
 		locationName: {
 			required: false,
			"internationalphanumeric+punct+whitespace": true,
			minlength: 3,
			maxlength: 50
 			//Buyer model says this is stored as an array, (length 1-100) but it is a dropdown in the UI.
 			//TODO: ask about this.
 		},
 		locationType: {
 			required: false
 			// (provided)
 			//Buyer model says this is stored as an array, (length 1-100) but it is a dropdown in the UI.
 			//TODO: ask about this.
 		},
 		locationCountry: {
 			required: false
 			// (provided)
 			//Buyer model says this is stored as an array, (length 1-100) but it is a dropdown in the UI.
 			//TODO: ask about this.
 		},
 		locationProvince: {
 			required: false
 			// (provided)
 			//Buyer model says this is stored as an array, (length 1-100) but it is a dropdown in the UI.
 			//TODO: ask about this.
 		},
 		locationCity: {
 			required: false,
			"internationalphanumeric+punct+whitespace": true,
			minlength: 2,
			maxlength: 50
 			//Buyer model says this is stored as an array, (length 1-100) but it is a dropdown in the UI.
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
 			//Buyer model says this is stored as an array, (length 1-100) but it is a dropdown in the UI.
 			//TODO: ask about this.
 		},
 		preferredSupplierLocation: {
 			required: false
 			// (provided)
 			//Buyer model says this is stored as an array (length 1-100), but it is a dropdown in the UI.
 			//TODO: ask about this.
 		},
 		preferredSupplierLanguage: {
 			required: false
 			// (provided)
 			//Buyer model says this is stored as an array (length 1-100), but it is a dropdown in the UI.
 			//TODO: ask about this.
 		}
	},
	messages:{
		acceptedDeliveryTerms: {
			required: "Please select at least one option."
		},
		acceptedCurrency: {
			required: "Please select at least one option."
		},
		acceptedPaymentTerms: {
			required: "Please select at least one option."
		}
	}
});

