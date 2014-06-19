
// If we prefer to combine the restictions to one message
jQuery.validator.addMethod("strongPassword", function(value, element, params) {
 return value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/);
}, jQuery.validator.format("Password must contain a number, a lowercase letter, and an uppercase letter."));


jQuery.validator.addMethod("internationalphanumeric+punct+whitespace", function(value, element, params) {
 return value.match(//);
}, jQuery.validator.format(""));


jQuery.validator.addMethod("numeric+whitespace", function(value, element, params) {
 return value.match(//);
}, jQuery.validator.format(""));


 jQuery.validator.addMethod("alphanumeric+punct+whitespace", function(value, element, params) {
 return value.match(//);
}, jQuery.validator.format(""));

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
			minlength: 3,
			maxlength: 50
		},
 		companyPhoneCountryCode:{
 			required: true,
			minlength: 1,
			maxlength: 8
 		},
 		companyPhone: {
			required: true,
			minlength: 5,
			maxlength: 50
 		},
 		companyPhoneExt: {
 			required: false,
 			minlength: 1,
			maxlength: 10
 		},
 		companyFaxCountryCode: {
 			required: true,
			minlength: 1,
			maxlength: 8
 		},
 		companyFax: {
			required: true,
			minlength: 5,
			maxlength: 50
 		},
 		companyFaxExt: {
 			required: false,
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
 		},
		companyAddress1: {
			required: true,
			minlength: 1,
			maxlength: 80
		},
		companyAddress2: {
			required: false,
			minlength: 1,
			maxlength: 80			
		},
		companyCountry: {
			required: true,
			//(provided)
		},
		companyProvince: {
			required: true
			//(provided)
		},
		companyPostalCode: {
			required: true,
			minlength: 1,
			maxlength: 20
		},
		companyIsHq: {
			//(n/a)
		},
		hqAddress1: {
			required: true,
			minlength: 1,
			maxlength: 80
		},
		hqAddress2: {
			required: false,
			minlength: 1,
			maxlength: 80
		},
		hqCountry: {
			required: true
			//(provided)
		},
		hqProvince: {
			required: true
			//(provided)
		},
		hqPostalCode: {
			required: true,
			minlength: 1,
			maxlength: 20
		},
		companyEmployeeCount: {
			required: true
			//(provided)
		}
	}
});



