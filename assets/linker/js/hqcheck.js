// It all begins with a click
$( ".hqbox" ).click(function() {

// If the hq box is checked...
if($(".hqbox").is(':checked')) {

// Disable hq field entry...
	$(".hqfield").prop('disabled', true);

// And copy over the values from the company fields
	$(".hqaddress1").val($(".address1").val());
	$(".hqaddress2").val($(".address2").val());
	$(".hqcompanyCountry").val($(".companyCountry").val());
	$(".hqcompanyProvince").val($(".companyProvince").val());
	$(".hqPostalCode").val($(".companyPostalCode").val());
} 

// Otherwise, forget about it...
else {
	$(".hqfield").prop('disabled', false);
}

});

