$('#desiredCompanyName').keyup(function() {
  var newCompanyName = $('#desiredCompanyName').val();
  $.get('/checkCompanyExists', { newCompanyName: newCompanyName }).done(function(data) {
    if (data === true) {
      $('#desiredCompanyNameStatus').html('This company name already exists');
    }
    if (data === false) {
      $('#desiredCompanyNameStatus').html('This company name is up for grabs');
    }
  });
});
