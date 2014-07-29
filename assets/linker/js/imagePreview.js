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
  $("#upload-photo").removeClass("disabled");
  $("#upload-photo").addClass("enabled");
  $("#upload-photo").removeClass("hide");
  $("#upload-photo").addClass("show");

  $("#uploadPhotos h5").removeClass("hide");
  $("#uploadPhotos h5").addClass("show");
});

$("#uploadPhotos").on('click', '#upload-photo.enabled', function() {
  var originalImageDimensions = $image.cropper("getImgInfo");
  var croppedImageDimensions = $image.cropper("getData");

  $.ajax({
    type: "POST",
    url: '/supplier/update/photos',
    data: { originalDimensions: originalImageDimensions, croppedDimensions: croppedImageDimensions, file: filePath },
    beforeSend: function() {
      $('.loading').show();
    },
    complete: function() {
      $('.loading').hide();
    },
    success: function(result) {
      $(".row .current-photos").append(
        "<div class='col-xs-6 col-sm-4'>" +
          "<div class='photo-box'>" +
            "<div class='photo-box-header'><i class='fa fa-times'></i></div>" +
            "<img name='photo' src='" + result.newImage + "'>" +
            "<input class='photo-src' name='' type='text' value='" + result.newImage + "'/>" +
          "</div>" +
        "</div>"
      );
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

/*$("#uploadPhotos").on("click", "i.fa-times", function() {
  console.log('clicked second method');
  if ($(this).parent().hasClass("header-remove")) {
    $(this).parent().removeClass("header-remove");
    $(this).parent().siblings('.photo-src').attr('name', '');
  } else {
    $(this).parent().addClass("header-remove");
    $(this).parent().siblings('.photo-src').attr('name', 'photos-to-delete');
  }
});*/

function readURL(input) {
  console.log('input files is ' + JSON.stringify(input.files, null, ' '));
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      console.log('e is ' + e.target.result);
      filePath = e.target.result;

      $('#img-preview').attr('src', e.target.result);
      //$('.cropper-container img').attr('src', e.target.result);
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
