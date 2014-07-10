$('.desiredHandle').keyup(function() {
  var newHandle = $(".desiredHandle").val();
  var length = newHandle.length;

  if (length == 1) { $(".handleStatus").html(""); }
  
  if (length >= 2) {
    $.get('/checkHandleExists', { newHandle: newHandle }).done(function(data) {
      if (data === true) {
        $(".handleStatus").html("This handle is already taken.");
        $(".handleStatus").removeClass("pos-feedback");
        $(".handleStatus").addClass("error neg-feedback");
      }
      if (data === false) {
        $(".handleStatus").html("This handle is available!");
        $(".handleStatus").removeClass("neg-feedback");
        $(".handleStatus").addClass("error pos-feedback");
      }
    });
  }
});
