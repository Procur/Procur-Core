$('#statements-of-responsibility').click(function() {
  $(".content-desc").attr("id", "inactive");
  $(".content-interest").attr("id", "inactive");
  $(".content-statement").removeAttr("id");
  return false;
});

$('#company-description').click(function() {
  $(".content-desc").removeAttr("id");
  $(".content-interest").attr("id", "inactive");
  $(".content-statement").attr("id", "inactive");
  return false;
});

$('#products-of-interest').click(function() {
  $(".content-desc").attr("id", "inactive");
  $(".content-interest").removeAttr("id");
  $(".content-statement").attr("id", "inactive");
  return false;
});

