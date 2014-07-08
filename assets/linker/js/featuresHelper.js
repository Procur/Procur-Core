$('.expander-contractor').click(function(){
	$('#communityRow').slideToggle('slow');
		setTimeout(function(){
			if (document.getElementById('communityRow').style.display == 'block'){
				document.getElementById('toggleText').innerHTML = "See Less Upcoming Features";
			} else {
				document.getElementById('toggleText').innerHTML = "See More Upcoming Features";
			}
		},800);
});