$('#desiredHandle').keyup(function() {
  var newHandle = $("#desiredHandle").val();
  var length = newHandle.length;

  if (length == 1) { $("#handleStatus").html(""); }
  
  if (length >= 2) {
    $.get('/checkHandleExists', { newHandle: newHandle }).done(function(data) {
      if (data === true) {
        $("#handleStatus").html("This handle is already taken.");
      }
      if (data === false) {
        $("#handleStatus").html("This handle is available!");
      }
    });
  }
});
