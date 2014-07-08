$('#desiredCompanyName').keyup(function() {
	var newCompanyName = $('#desiredCompanyName').val();
	$.get('/checkCompanyExists', { newCompanyName: newCompanyName }).done(function(data) {
		if (data === true) {
			$('#desiredCompanyNameStatus').html('This company name EXISTS bitch');
			console.log('this company name exists bitch!');
		}
		if (data === false) {
			$('#desiredCompanyNameStatus').html('This company name is up for grabs!!!!');
			console.log('this is up for grabs!!!');
		}
	});
});
