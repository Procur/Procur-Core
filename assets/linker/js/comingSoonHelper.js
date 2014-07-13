$('.orangeWrap').removeAttr("href");


$('.orangeWrap').hover(
	function(){
		prevHtml = $(this).find('h3').html();
		$(this).find('h3').html('Coming Soon');
	},
	function(){
		$(this).find('h3').html(prevHtml);
	}
	);