$( ".hqbox" ).click(function() {

if($(".hqbox").is(':checked')) {
	$(".hqaddress").prop('disabled', true);
} 
else {
	$(".hqaddress").prop('disabled', false);
}

});

