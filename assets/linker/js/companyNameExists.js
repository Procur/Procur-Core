var companyNameTaken;

$('#desiredCompanyName').keyup(function() {
  var newCompanyName = $('#desiredCompanyName').val();
  $.get('/checkCompanyExists', { newCompanyName: newCompanyName }).done(function(data) {
    companyNameTaken = data;
  });
});