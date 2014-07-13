$(".contact-first-dropdown").change(function() {
  if ($(this).val() !== "") {
    $(".contact-second-dropdown").removeAttr("disabled");
    $(".contact-second-dropdown").html(populateNextDropdown($(this).val()));
  }
});

function populateNextDropdown(selection) {
  var reasons = {
    "Help & Support": ["Trouble Registering","Trouble Logging In","Error Screen Displayed","Other Problems"],
    "Partnerships": ["General Information","Initiatives","Philanthropy","Other"],
    "Press & Media": ["Professional Contact","Blog/Social Media","Materials","Advertising","Other"],
    "Feedback": ["General","New Feature Request","Issues","Othere"],
    "General Inquiries": ["Investment","Membership","Platform/Website","Company","Careers","Other"]
  };
  var keys = Object.keys(reasons);
  var dropdownValues;
  var dropdownHtml = "<option value=''>Field 2*</option>";

  for (var x = 0; x < keys.length; x++) {
    if (keys[x] === selection) {
      dropdownValues = reasons[keys[x]];
    }
  }

  dropdownValues.forEach(function(val) {
    dropdownHtml += "<option value='"+val+"'>"+ val +"</option>";
  });

  return dropdownHtml;
}