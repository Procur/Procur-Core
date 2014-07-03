
  function Affixing() {
    $('#nav-wrapper').height($("#nav").height());

    $('#nav').affix({

        offset: { top: $('#nav').offset().top }
    });
  };

  var a = document.createElement('a');
  a.href = '';

  if (a.href.indexOf('faq') != -1) {Affixing()}
  



