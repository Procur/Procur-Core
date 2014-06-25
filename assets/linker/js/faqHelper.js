$(function() {
    $('#nav-wrapper').height($("#nav").height());

    $('#nav').affix({
        offset: { top: $('#nav').offset().top }
    });
});
