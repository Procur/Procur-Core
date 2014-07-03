
  $('.container').waypoint(function(direction){
    if (direction == 'down'){
      $(".sticky-header").slideDown(200,'linear');
    } else {
      $(".sticky-header").slideUp(200,'linear');
    }
    
  },{ offset: -80});