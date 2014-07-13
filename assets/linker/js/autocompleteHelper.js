/*$(document).on('click', function(){
  var contents = ($('#autocomplete1').val());
  console.log(contents);
  var n = contents.indexOf(">");
  console.log(n);
  if (n != -1){
    $('.ui-helper-hidden-accessible').css("display","none");
  }
});
*/


$('#autocomplete1').on('focus', function(){
  $('#autocomplete1').on('keyup', function(){
    var contents = $(this).val().length;
    if (contents > '2'){
    $('.autocompleteWrapper1').find('.ui-helper-hidden-accessible').css("display","inline");
    }
  });
  $(document).on('click', function(){
    var contents = ($('#autocomplete1').val());
    var n = contents.indexOf('>');
    var m = contents.indexOf('&');

    if (n != -1 || m != -1){
      $('.ui-helper-hidden-accessible').css("display","none");
    }
  });
  $('#autocomplete1').on('blur', function(){
    $('.autocompleteWrapper1').find('.ui-helper-hidden-accessible').css("display","none");
  });
});

$('#autocomplete2').on('focus', function(){
  $('#autocomplete2').on('keyup', function(){
    var contents = $(this).val().length;
    if (contents > '2'){
    $('.autocompleteWrapper2').find('.ui-helper-hidden-accessible').css("display","inline");
    }
  });
  $(document).on('click', function(){
    var contents = ($('#autocomplete2').val());
    var n = contents.indexOf('>','&');
    if (n != -1){
      $('.ui-helper-hidden-accessible').css("display","none");
    }
  });
  $('#autocomplete2').on('blur', function(){
    $('.autocompleteWrapper2').find('.ui-helper-hidden-accessible').css("display","none");
  });
});

$('#autocomplete3').on('focus', function(){
  $('#autocomplete3').on('keyup', function(){
    var contents = $(this).val().length;
    if (contents > '2'){
    $('.autocompleteWrapper3').find('.ui-helper-hidden-accessible').css("display","inline");
    }
  });
  $(document).on('click', function(){
    var contents = ($('#autocomplete3').val());
    var n = contents.indexOf('>','&');
    if (n != -1){
      $('.ui-helper-hidden-accessible').css("display","none");
    }
  });
  $('#autocomplete3').on('blur', function(){
    $('.autocompleteWrapper3').find('.ui-helper-hidden-accessible').css("display","none");
  });
});
