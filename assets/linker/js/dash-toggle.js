$( ".typeToggle.buyer" ).click(function() {
  $.post( "/togglemode", { mode: "supplier" }).done(function(){
    location.reload();
  });
});

$( ".typeToggle.supplier" ).click(function() {
  $.post( "/togglemode", { mode: "buyer" }).done(function(){
    location.reload();
  });
});


