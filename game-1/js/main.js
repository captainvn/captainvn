//--DOCUMENT READY FUNCTION BEGIN
jQuery(document).ready(function () {
    $('.featured_game_slider .owl-carousel').owlCarousel({
        center: true,
        items:2,
        margin:10,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: false,
        loop: true,
        dots: true,
        responsive: {
            0: {
                items: 2,
            },
            480: {
                items: 2,
            },
            767: {
                items: 3,

            },
            991: {
                items: 2,

            },
            1200: {
                items: 2
            }
        }
    });    
    // OWL SLIDER BUTTON
    $(".featured_game_slider .slide_prev").click(function () {
        $(".featured_game_slider .owl-carousel").trigger('prev.owl.carousel');
        return false;
    });
    $(".featured_game_slider .slide_next").click(function () {
        $(".featured_game_slider .owl-carousel").trigger('next.owl.carousel');
        return false;
    });    
    // ============ MOBILE MENU BEGIN ================
    jQuery('.btn-menu-canvas').click(function () {    
        if (jQuery('#offcanvas').hasClass('active')) {
            jQuery('body').removeClass('off-canvas-active');
            jQuery('#offcanvas').removeClass('active');
            jQuery('.wrapper-container').removeClass('offcanvas-push');
        } else {
            jQuery('body').addClass('off-canvas-active');
            jQuery('#offcanvas').addClass('active');
            jQuery('.wrapper-container').addClass('offcanvas-push');
        }
    });
    jQuery('#off-canvas-button').click(function () {
        jQuery('#offcanvas').removeClass('active');
        jQuery('.wrapper-container').removeClass('offcanvas-push');        
    });
    jQuery(document).mouseup(function (e) {
        var container = jQuery("#offcanvas");
        if (container.is(":visible")) {
            if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                jQuery('#offcanvas').removeClass('active');
                jQuery('.wrapper-container').removeClass('offcanvas-push');
            }
        }
    });
    jQuery("#offcanvas .navbar-nav ul").hide();
    jQuery("#offcanvas .navbar-nav li h3 i").addClass("accordion-show");
    jQuery("#offcanvas .navbar-nav li h3 i").click(function () {
        if (jQuery(this).parent().next().is(":visible")) {
            jQuery(this).addClass("accordion-show");
        } else {
            jQuery(this).removeClass("accordion-show");
        }
        jQuery(this).parent().next().toggle(400);
        if (jQuery(this).hasClass("arrow_carrot-down")) {
            jQuery(this).removeClass("arrow_carrot-down");           
        } else {
            jQuery(this).addClass("arrow_carrot-down");          
        }
    });

    // =========== BACK TO TOP ==========
    $('#back-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    jQuery('.language-toolbox .language-selector').click(function(e){
      e.preventDefault();
        jQuery(this).parents(".language-toolbox").toggleClass("active"); 
    });

});
//--DOCUMENT READY FUNCTION END

//--WINDOW LOADED FUNCTION BEGIN
jQuery(window).bind("load", function () {
    
});
//--WINDOW LOADED FUNCTION END

//--WINDOW RESIZE FUNCTION BEGIN
jQuery(window).resize(function () {
    
});
//--WINDOW RESIZE FUNCTION END
jQuery(window).scroll(function () {
  // =========== BACK TO TOP ==========
  if ($(this).scrollTop() > 50) {
      $('#back-to-top').fadeIn(600);
  } else {
      $('#back-to-top').fadeOut(600);
  }
});