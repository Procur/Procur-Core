function isDashboard(){
	var a = document.createElement('a');
	a.href = '';
	console.log(a.href);
	if ( a.href.indexOf('dashboard') != -1){
		console.log('1');
		$('#dashboard-header.subnav').find('a.dashboard').css({'color':'white', 'font-weight': '300'});
		$('#dashboard-header.subnav').find('a.dashboard').removeAttr("href");
		$('#dashboard-header.subnav').find('a.dashboard').addClass("active");
	} else if ( a.href.indexOf('companies') != -1){
		console.log('2');
		$('#dashboard-header.subnav').find('a.company').css({'color':'white', 'font-weight': '300'});
		$('#dashboard-header.subnav').find('a.company').removeAttr("href");
		$('#dashboard-header.subnav').find('a.company').addClass("active");
	} else if ( a.href.indexOf('company') != -1){
		console.log('3');
		$('#dashboard-header.subnav').find('a.updateCompany').css({'color':'white', 'font-weight': '300'});
		$('#dashboard-header.subnav').find('a.updateCompany').removeAttr("href");
		$('#dashboard-header.subnav').find('a.updateCompany').addClass("active");
	}	else if ( a.href.indexOf('user') != -1){
		console.log('4');
		$('#dashboard-header.subnav').find('a.updateUser').css({'color':'white', 'font-weight': '300'});
		$('#dashboard-header.subnav').find('a.updateUser').removeAttr("href");
		$('#dashboard-header.subnav').find('a.updateUser').addClass("active");
	}
}

isDashboard();

$('#dashboard-header.subnav').find('a.active').hover(function() {
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