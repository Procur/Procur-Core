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
      $('#blah2').attr('src', result.newImage);
      $('.img-container2').css('display', 'block');
      $('#carousel-image-1').attr('src', 'http://terryshoemaker.files.wordpress.com/2013/03/placeholder1.jpg');
    },
    error: function(error) {
      console.log('error is ' + error);
    }
  });
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function (e) {
      filePath = e.target.result;
      $('#blah').attr('src', e.target.result);
      $('.img-container').css('display','block');

      displayCropper();
    }
      
    reader.readAsDataURL(input.files[0]); 
  }
}

function displayCropper() {
  $(".cropper").cropper({
    aspectRatio: 16 / 9,
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
