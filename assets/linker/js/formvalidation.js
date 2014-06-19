
// If we prefer to combine the restictions to one message
jQuery.validator.addMethod("strongPassword", function(value, element, params) {
 return value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/);
}, jQuery.validator.format("Password must contain a number, a lowercase letter, and an uppercase letter."));


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