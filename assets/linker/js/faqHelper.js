
  function Affixing() {
    $('#nav-wrapper').height($("#nav").height());

    $('#nav').affix({

        offset: { top: $('#nav').offset().top }
    });

    $('body').scrollspy({ target: '.navbar-example' })
});
