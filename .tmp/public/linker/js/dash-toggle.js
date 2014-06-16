$( ".typeToggle.buyer" ).click(function() {
  $.post( "/togglemode", { mode: "supplier" } );
  location.reload();
});

$( ".typeToggle.supplier" ).click(function() {
  $.post( "/togglemode", { mode: "buyer" } );
  location.reload();
});


