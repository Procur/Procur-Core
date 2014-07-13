var companyHandleTaken;

$('#desiredHandle').keyup(function() {
  var newHandle = $("#desiredHandle").val();
  $.get('/checkHandleExists', { newHandle: newHandle }).done(function(data) {
    companyHandleTaken = data;
  });
});
