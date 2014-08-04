var croppedImageDimensions = {};
var jcrop;
var filePath;
var file;

$("#imgInp").change(function(){
  readURL(this);
  $("#uploadPhotos h5").removeClass("hide");
  $("#uploadPhotos h5").addClass("show");
});

$("#uploadPhotos").on('click', '#upload-photo.enabled', function() {

  var urlPath;
  
  if ($("#buyerPhotos").length) { var urlPath = "/buyer/update/photos"; }
  if ($("#supplierPhotos").length) { var urlPath = "/supplier/update/photos"; }

  cropperIsFullImage(croppedImageDimensions);

  $.ajax({
    type: "POST",
    url: urlPath,
    data: { croppedDimensions: croppedImageDimensions, file: filePath },
    beforeSend: function() {
      $('.loading').show();
    },
    complete: function() {
      $('.loading').hide();
      if ($(".current-photos h3").length) { $(".current-photos h3").remove(); }
    },
    success: function(result) {
      $(".current-photos").append(
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
      console.log("Error is " + JSON.stringify(error, null, ' '));
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

function initDimensions() {
  croppedImageDimensions = {
    "x"  : "",
    "y"  : "",
    "x2" : "",
    "y2" : "",
    "w"  : "",
    "h"  : ""
  };
}

function cropperIsFullImage(dimensions) {
  if (dimensions["w"] == 0 || dimensions["h"] == 0) {
    initDimensions();
  }
}

function isFileSizeValid(file, e) {
  if (file.size > 2000000) {
    $("#upload-photo").removeClass("enabled");
    $("#upload-photo").addClass("disabled");
    $("#upload-photo").removeClass("hide");
    $("#upload-photo").addClass("show");

    $('#img-preview').attr('src', ' ');
    $('#img-preview').attr('src', '/images/addUserPhoto.png'); 
    $('#img-preview').css('display','block');
  } else {
    $("#upload-photo").removeClass("disabled");
    $("#upload-photo").addClass("enabled");
    $("#upload-photo").removeClass("hide");
    $("#upload-photo").addClass("show");

    $('#img-preview').attr('src', ' ');
    $('#img-preview').attr('src', e.target.result);
    $('#img-preview').css('display','block');
  }
}

function readURL(input) {
  if ( $(".jcrop-holder").length ) {
    $("#img-preview").css("visibility", "");
    $("#img-preview").css("width", "");
    $("#img-preview").css("height", "");
    jcrop.destroy();
  }

  if (input.files && input.files[0]) {
    file = input.files && input.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      filePath = e.target.result;

      isFileSizeValid(file, e);
      initDimensions();

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
