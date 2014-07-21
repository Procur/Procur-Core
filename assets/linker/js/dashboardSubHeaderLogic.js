function isDashboard(){
	var a = document.createElement('a');
	a.href = '';

	if ( a.href.indexOf('dashboard') != -1){
		$('.dashboard-header-right').find('a.dashboard').css({'color':'white', 'font-weight': '300'});
		$('.dashboard-header-right').find('a.dashboard').removeAttr("href");
		$('.dashboard-header-right').find('a.dashboard').addClass("active");
		console.log(1);
	} else if ( a.href.indexOf('companies') != -1){

		$('.dashboard-header-right').find('a.company').css({'color':'white', 'font-weight': '300'});
		$('.dashboard-header-right').find('a.company').removeAttr("href");
		$('.dashboard-header-right').find('a.company').addClass("active");
		console.log(2);
	} else if ( a.href.indexOf('company') != -1){

		$('.dashboard-header-right').find('a.updateCompany').css({'color':'white', 'font-weight': '300'});
		$('.dashboard-header-right').find('a.updateCompany').removeAttr("href");
		$('.dashboard-header-right').find('a.updateCompany').addClass("active");
		console.log(3);
	}	else if ( a.href.indexOf('user') != -1){

		$('.dashboard-header-right').find('a.updateUser').css({'color':'white', 'font-weight': '300'});
		$('.dashboard-header-right').find('a.updateUser').removeAttr("href");
		$('.dashboard-header-right').find('a.updateUser').addClass("active");
		console.log(4);
	}
}

isDashboard();

$('.dashboard-header-right').find('a.active').hover(function() {
	$(this).css({'background': '#333132'});
});
/*
$('a.company').hover(function() {
	$(this).css({'background': '#333132'});
});
$('a.updateCompany').hover(function() {
	$(this).css({'background': '#333132'});
});
$('a.updateUser').hover(function() {
	$(this).css({'background': '#333132'});
});*/
