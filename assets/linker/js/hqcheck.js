// It all begins with a click
$( ".hqbox" ).click(function() {

// If the hq box is checked...
if($(".hqbox").is(':checked')) {

// Disable hq field entry...
	// $(".hqfield").prop('disabled', true);


  alert($(".companyCountry").val());
	alert($(".companyProvince").val());

// And copy over the values from the company fields
	$(".hqaddress1").val($(".address1").val());
	$(".hqaddress2").val($(".address2").val());
	$(".hqcompanyCountry").val($(".companyCountry").val());
	setTimeout(function(){
	$(".hqcompanyProvince").val($(".companyProvince").val());
	$(".hqPostalCode").val($(".companyPostalCode").val());},5000);
}

// Otherwise, forget about it...
else {
	$(".hqfield").prop('disabled', false);
}

});
