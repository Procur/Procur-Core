
	$('.container').waypoint(function(direction){
		console.log('Basic example callback triggered from'+direction);
		if (direction == 'down'){
			$(".sticky-header").animate({top:["0px","easeOutExpo"]},600);
		} else {
			$(".sticky-header").animate({top:["-54px","easeOutExpo"]},600);
		}
		
	},{ offset: -80});