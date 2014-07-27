var $image = $(".img-container img"),
    $dataX1 = $("#data-x1"),
    $dataY1 = $("#data-y1"),
    $dataX2 = $("#data-x2"),
    $dataY2 = $("#data-y2"),
    $dataHeight = $("#data-height"),
    $dataWidth = $("#data-width");
var filePath;

$("#imgInp").change(function(){
  readURL(this);
});

$("#myButton").click(function() {
  var originalImageDimensions = $image.cropper("getImgInfo");
  var croppedImageDimensions = $image.cropper("getData");

  $.ajax({
    type: "POST",
    url: '/supplier/update/photos',
    data: { originalDimensions: originalImageDimensions, croppedDimensions: croppedImageDimensions, file: filePath },
    success: function(result) {
      console.log('photo upload done');
    },
    error: function(error) {
      console.log('error is ' + error);
    }
  });
});

$("i.fa-times").click(function() {
  if ($(this).parent().hasClass("header-remove")) {
    $(this).parent().removeClass("header-remove");
    $(this).parent().siblings('.photo-src').attr('name', '');
  } else {
    $(this).parent().addClass("header-remove");
    $(this).parent().siblings('.photo-src').attr('name', 'photos-to-delete');
  }
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function (e) {
      filePath = e.target.result;
      $('#img-preview').attr('src', e.target.result);
      $('.img-container').css('display','block');

      displayCropper();
    }
      
    reader.readAsDataURL(input.files[0]); 
  }
}

function displayCropper() {
  $(".cropper").cropper({
    aspectRatio: "auto",
    done: function(data) {
      $dataX1.val(data.x1);
      $dataY1.val(data.y1);
      $dataX2.val(data.x2);
      $dataY2.val(data.y2);
      $dataHeight.val(data.height);
      $dataWidth.val(data.width);
    }
  });
}
