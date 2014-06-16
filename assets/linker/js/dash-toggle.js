$( ".typeToggle.buyer" ).click(function() {
  $.get( "/togglemode", { mode: "supplier" } );
});

$( ".typeToggle.supplier" ).click(function() {
  $.get( "/togglemode", { mode: "buyer" } );
});


