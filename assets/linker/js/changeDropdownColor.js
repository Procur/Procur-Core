

$('#regWizard, #companyUpdate').find('select').change(function(){
	$(this).css({'color':'#000000','font-weight': 400});
});

$('#regWizard, #companyUpdate').find('input').keyup(function(){
	$(this).css({'color':'#000000','font-weight': 400});

});

$('#companyUpdate').find('input').css({'color':'#000000','font-weight': 400});
$('#companyUpdate').find('select').css({'color':'#000000','font-weight': 400});
