
$('#companyProvince').on('focus mousedown', function(e) {
  var a = $('#companyCountry').val();
  if (a === "") {
  //if ($.browser.webkit||$.browser.msie) {
    e.preventDefault();
    $('#noCountryWarning').html('no country selected').css('display','inline');
    $('#noCountryWarning').addClass("neg-feedback");
      //}else{
      //    this.blur();
      //    window.focus();
      //}
  }
});

$('#companyCountry').on('focus mousedown', function(e) {
  $('#noCountryWarning').css('display','none');
});

//HQ State Country
$('#hqcompanyProvince').on('focus mousedown', function(e) {
  var b = $('#hqcompanyCountry').val();
  console.log(b);
  if (b === "") {
  //if ($.browser.webkit||$.browser.msie) {
    e.preventDefault();
    $('#noHQCountryWarning').html('no country selected').css('display','inline');
    $('#noHQCountryWarning').addClass("neg-feedback");
      //}else{
      //    this.blur();
      //    window.focus();
      //}
  }
});

$('#hqcompanyCountry').on('focus mousedown', function(e) {
  $('#noHQCountryWarning').css('display','none');
});

//Deal with box unchecking reset
$(".hqbox").click( function() {
  if( $(this).is(':unchecked')) {
    $('#hqcompanyCountry').val("");
    
  }
});

//For Buyer Wizard
$('#buyerOtherLocationProvince').on('focus mousedown', function(e) {
  var a = $('#buyerOtherLocationCountry').val();
  if (a === "") {
  //if ($.browser.webkit||$.browser.msie) {
    e.preventDefault();
    $('#noOtherCountryWarning').html('no country selected').css('display','inline');
    $('#noOtherCountryWarning').addClass("neg-feedback");
      //}else{
      //    this.blur();
      //    window.focus();
      //}
  }
});

$('#buyerOtherLocationCountry').on('focus mousedown', function(e) {
  $('#noOtherCountryWarning').css('display','none');
});

//For Supplier Wizard
$('#supplierOtherLocationProvince').on('focus mousedown', function(e) {
  var a = $('#supplierOtherLocationCountry').val();
  if (a === "") {
  //if ($.browser.webkit||$.browser.msie) {
    e.preventDefault();
    $('#noOtherSupplierCountryWarning').html('no country selected').css('display','inline');
    $('#noOtherSUpplierCountryWarning').addClass("neg-feedback");
      //}else{
      //    this.blur();
      //    window.focus();
      //}
  }
});

$('#supplierOtherLocationCountry').on('focus mousedown', function(e) {
  $('#noOtherSupplierCountryWarning').css('display','none');
});
