var croppedImageDimensions = {};
var jcrop;
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

  $.ajax({
    type: "POST",
    url: '/supplier/update/photos',
    data: { croppedDimensions: croppedImageDimensions, file: filePath },
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

$(".photo-preview-area").on("click", "i.fa-times", function() {
  if ($(this).parent().hasClass("header-remove")) {
    $(this).parent().removeClass("header-remove");
    $(this).parent().siblings('.photo-src').attr('name', '');
  } else {
    $(this).parent().addClass("header-remove");
    $(this).parent().siblings('.photo-src').attr('name', 'photos-to-delete');
  }
});

function showCoords(c) {
  croppedImageDimensions["x"] = Math.floor(c.x);
  croppedImageDimensions["y"] = Math.floor(c.y);
  croppedImageDimensions["x2"] = Math.floor(c.x2);
  croppedImageDimensions["y2"] = Math.floor(c.y2);
  croppedImageDimensions["w"] = Math.floor(c.w);
  croppedImageDimensions["h"] = Math.floor(c.h);
}

function readURL(input) {
  if ( $(".jcrop-holder").length ) {
    $("#img-preview").css("visibility", "");
    $("#img-preview").css("width", "");
    $("#img-preview").css("height", "");
    jcrop.destroy();
  }

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      filePath = e.target.result;

      $('#img-preview').attr('src', ' ');
      $('#img-preview').attr('src', e.target.result);
      $('#img-preview').css('display','block');

      $('#img-preview').Jcrop({
        onSelect: showCoords,
        onChange: showCoords,
        bgColor: 'black',
        bgOpacity: .60,
        minSize: [50, 50],
        aspectRatio: 16 / 9,
        boxWidth: 300,
        allowMove: true
      }, function() {
        jcrop = this;
      });

      $('.img-container').css({
        width: '300px'
      });
      $('.jcrop-tracker').css({
        width: '300px'
      });
      $('.jcrop-holder').css({
        width: '300px'
      });
    }
      
    reader.readAsDataURL(input.files[0]); 
  }
}
