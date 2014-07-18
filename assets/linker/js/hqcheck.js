var propogateHqClick = function() {
  // If the hq box is checked...
  if($(".hqbox").is(':checked')) {

    // Disable hq field entry...
    $('.hqcompanyCountry').replaceWith('<input class="hqfield hqcompanyCountry"  name="hqcompanyCountry" id="hqcompanyCountry" type="text" />');
    $('.hqcompanyProvince').replaceWith('<input class="hqfield hqcompanyProvince" name="hqcompanyProvince" id="hqcompanyProvince" type="text" />');
    // And copy over the values from the company fields
    $(".hqaddress1").val($(".address1").val());
    $(".hqaddress2").val($(".address2").val());
    $(".hqCity").val($(".companyCity").val());
    $(".hqcompanyCountry").val($(".companyCountry").val());
    $(".hqcompanyProvince").val($(".companyProvince").val());
    $(".hqPostalCode").val($(".companyPostalCode").val());

    $(".hqaddress1").css({ background: "#FFF" });
    $(".hqaddress2").css({ background: "#FFF" });
    $(".hqcompanyCity").css({ background: "#FFF" });
    $(".hqcompanyCountry").css({ background: "#FFF" });
    $(".hqcompanyProvince").css({ background: "#FFF" });
    $(".hqPostalCode").css({ background: "#FFF" });

    $(".hqfield").prop('disabled', true);
  }
  // Otherwise, forget about it...
  else {
    $(".hqfield").prop('disabled', false);
    $('.hqcompanyCountry').replaceWith("<select class='hqfield hqcompanyCountry' name='hqcompanyCountry' id='hqcompanyCountry' onchange='print_state(\"hqcompanyProvince\",this.selectedIndex);'><option value='0'>Select Country</option></select>");
    $('.hqcompanyProvince').replaceWith('<select class="hqfield hqcompanyProvince" name="hqcompanyProvince" id="hqcompanyProvince"><option value="0">Select Province/State</option></select><script language="javascript">print_country("hqcompanyCountry");</script>');
    $(".hqaddress1").val("");
    $(".hqaddress2").val("");
    $(".hqcompanyCity").val("");
    $(".hqPostalCode").val("");
  }

};

// It all begins with a click
$( ".hqbox" ).click(function(){
    propogateHqClick();
});
