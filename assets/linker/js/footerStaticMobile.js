var mq = window.matchMedia( "(min-width: 500px)" );
if (mq.matches) {
	console.log('window more than 500px');
  $('#dashboard-footer').find('nav').addClass('navbar-fixed-bottom');
}
else {
	console.log('window less than 500px');
}
