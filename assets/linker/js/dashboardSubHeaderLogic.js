function isDashboard(){
	var a = document.createElement('a');
	a.href = '';

	if ( a.href.indexOf('dashboard') != -1){
		$('#dashboard-header').find('a.dashboard').css({'color':'white', 'font-weight': '300'});
		$('#dashboard-header').find('a.dashboard').removeAttr("href");
		$('#dashboard-header').find('a.dashboard').addClass("active");
	} else if ( a.href.indexOf('companies') != -1){

		$('#dashboard-header').find('a.company').css({'color':'white', 'font-weight': '300'});
		$('#dashboard-header').find('a.company').removeAttr("href");
		$('#dashboard-header').find('a.company').addClass("active");
	} else if ( a.href.indexOf('company') != -1){

		$('#dashboard-header').find('a.updateCompany').css({'color':'white', 'font-weight': '300'});
		$('#dashboard-header').find('a.updateCompany').removeAttr("href");
		$('#dashboard-header').find('a.updateCompany').addClass("active");
	}	else if ( a.href.indexOf('user') != -1){

		$('#dashboard-header').find('a.updateUser').css({'color':'white', 'font-weight': '300'});
		$('#dashboard-header').find('a.updateUser').removeAttr("href");
		$('#dashboard-header').find('a.updateUser').addClass("active");
	}
}

isDashboard();

$('#dashboard-header').find('a.active').hover(function() {
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
