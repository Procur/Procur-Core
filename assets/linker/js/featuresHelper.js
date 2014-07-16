$('.expander-contractor').click(function(){
	$('#communityRow').slideToggle('slow');
		setTimeout(function(){
			if (document.getElementById('communityRow').style.display == 'block'){
				document.getElementById('toggleText').innerHTML = "See Less Upcoming Features";
				$('#chevronContainerUp').css("display","block");
				$('#chevronContainerDown').css("display", "none");
				$('#features').find('.toggleText').css("margin-top", "0px");
				$('#features').find('.toggleText').css("padding-bottom", "20px");
				$('.expander-contractor').find('i').css("padding-top", "15px");

			} else {
				document.getElementById('toggleText').innerHTML = "See More Upcoming Features";
				$('#chevronContainerUp').css("display","none");
				$('#chevronContainerDown').css("display", "block");
				$('#features').find('.toggleText').css("margin-top", "10px");
				$('#features').find('.toggleText').css("padding-bottom", "0px");
				$('.expander-contractor').find('i').css("padding-top", "0px");
			}
		},700);
});
