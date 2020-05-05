//var hT = $('.header-top').offset().top;
var hT = $('.header-top').outerHeight();
var hH = $('.header').outerHeight();
$('.fix-header').css('height', hH);

function sticky_header() {
    var wH = $(window).height(),
        wS = jQuery(window).scrollTop();
    if (wS > hT) {
        $('header').addClass('sticky');
        $('.fix-header').css('display', 'block');
    } else {
        $('header').removeClass('sticky');
        $('.fix-header').css('display', 'none');
    }

}

//--DOCUMENT READY FUNCTION BEGIN
jQuery(document).ready(function() {










    //Footer menu mobile
    jQuery(document).on('click', 'footer .widget-title', function(e) {
        e.preventDefault();
        jQuery(this).find('.fa').toggleClass('fa-plus fa-minus');
        jQuery(this).next('ul').slideToggle();

    });
    jQuery(document).on('click', '.pr-pic-header', function() {
        jQuery(this).find('i').toggleClass("rotate");
        jQuery(this).next('.pr-pic').slideToggle();
    });


    //Home page car slider
    var home_slider_option = {
        nav: true,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        items: 1,
        autoplay: false,
        autoplayTimeout: 6000,
        autoplayHoverPause: false,
        loop: true,
        dots: true,
        //video:true,
        //merge:true,
        //lazyLoad:true
    }

    var home_slider = $('#home-slider');

    home_slider.on('initialized.owl.carousel', function(e) {
        var current = e.item.index;
        var src = $(e.target).find(".owl-item").eq(current).find(".caption-animate").addClass('animated fadeInUp');
    });

    home_slider.owlCarousel(home_slider_option);

    home_slider.on('changed.owl.carousel', function(e) {
        $('#home-slider').find(".caption-animate").removeClass('animated fadeInUp');
        var current = e.item.index;
        var src = $(e.target).find(".owl-item").eq(current).find(".caption-animate").addClass('animated fadeInUp');
    });





    //Mobile menu new
    function toogle_mobilenav(n) {
        if (n == 'hide') {
            jQuery('body').removeClass('mobilenav-show');
        } else if (n == 'show') {
            jQuery('body').removeClass('mobilenav-show');
        } else {
            jQuery('body').toggleClass('mobilenav-show');
        }
    }
    jQuery('.mobilenav-toggle,.mobilenav-close').click(function(e) {
        e.preventDefault();
        toogle_mobilenav();
    });
    jQuery(document).mouseup(function(e) {
        var container = jQuery("#mobilenav-main");
        if (container.is(":visible")) {
            if (!container.is(e.target) // if the target of the click isn't the container...
                &&
                container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                toogle_mobilenav('hide');
            }
        }
    });
    jQuery('.mobilenav-inner li').each(function() {
        var svg = '<svg width="53.418" height="100.75" viewBox="0 0 53.418 100.75">' +
            '<path d="M5.193,100.75H3.084A3.079,3.079,0,0,1,.856,95.542L41.94,52.5a3.084,3.084,0,0,0,0-4.254L.856,5.208A3.081,3.081,0,0,1,3.084,0H5.193A3.076,3.076,0,0,1,7.42.954L52.563,48.248a3.084,3.084,0,0,1,0,4.254L7.42,99.8A3.076,3.076,0,0,1,5.193,100.75Z" transform="translate(0.004 0)"/>' +
            '</svg>';
        if (jQuery(this).children('ul').length != 0) {
            jQuery(this).addClass('has-sub');
            jQuery(this).children('a').wrap('<div class="has-sub-toggle"></span>');
            jQuery(this).children('.has-sub-toggle').append('<span class="toggle-mobilenav-sub">' + svg + '</span>');
        }
    });
    jQuery(document).on('click', '.toggle-mobilenav-sub', function() {
        jQuery(this).toggleClass('active');
        jQuery(this).closest('.has-sub').children('ul').slideToggle();
    });




    //Back to top
    $('.cd-top').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });


});
//--DOCUMENT READY FUNCTION END

//--WINDOW LOADED FUNCTION BEGIN
jQuery(window).bind("load", function() {

});
//--WINDOW LOADED FUNCTION END

//--WINDOW RESIZE FUNCTION BEGIN
jQuery(window).resize(function() {

});



$(window).scroll(function() {

    sticky_header();
    //Back to top
    if ($(this).scrollTop() > 50) {
        $('.cd-top').addClass('cd-is-visible');
    } else {
        $('.cd-top').removeClass('cd-is-visible');
    }

});


//Parallax

function scrollBanner() {
    $(document).on('scroll', function() {
        var scrollPos = $(this).scrollTop();
        $('.parallax-window-ct').css({
            'top': (scrollPos / 2) + 'px'
        });
        $('.slide-caption-content').css({
            'top': (scrollPos / -3.5) + 'px',
            'opacity': 1 - (scrollPos / 960)
        });
    });
}
scrollBanner();