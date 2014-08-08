$('#regWizard, #companyUpdate').on('change', '.styledSelect select', function() {
  $(this).css({'color':'#000000','font-weight': 400});
});

$('#regWizard, #companyUpdate').find('.styledSelect select').val(function(index, value) {
  if (value) {
    $(this).parent().css({'color':'#000000','font-weight':400});
  }
  else {
    $(this).parent().css({'color':'#7F7F7F','font-weight':400});
  }
  return value;
});

