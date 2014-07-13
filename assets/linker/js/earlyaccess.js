$( ".rightSec" ).click(function() {
  if ($(this).next().is(':visible')) {
    $( ".featuresDetail" ).slideUp( "fast" );
    return false;
  }

  else {
    $( ".featuresDetail" ).slideUp( "fast" );
      $( ".rightSecIndicator.plus" ).fadeIn( 300 );
    $( ".rightSecIndicator.minus" ).fadeOut( 300 );

    $(this).children().eq(2).fadeOut( 300 );
    $(this).children().eq(3).fadeIn( 300 );
    $(this).next().delay().slideDown( "fast" );
  }
});