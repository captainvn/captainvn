// MOBILE ACCOUNT MENU
function account_clickable() {
    if (jQuery(window).width() < 992) {
        jQuery(".project-menu > .menu-icon").attr("data-clickable", "true");
        jQuery(".account-info > a").attr("data-clickable", "true");
    } else {
        jQuery(".project-menu > .menu-icon").attr("data-clickable", "false");
        jQuery(".account-info > a").attr("data-clickable", "false");
    }
}
//BODY PADDING TOP
function body_padding_top() {
    jQuery("#site-content").css("padding-top", parseInt(jQuery("header").outerHeight()));

}
//--DOCUMENT READY FUNCTION BEGIN
jQuery(document).ready(function() {
    body_padding_top();
    account_clickable();



    //User car slider
    if (jQuery(".main-car-pic").length != 0) {
        $('.main-car-pic').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            asNavFor: '.sub-car-pic'
        });
        $('.sub-car-pic').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.main-car-pic',
            dots: true,
            arrows: false,
            centerMode: false,
            focusOnSelect: true,
            responsive: [{
                breakpoint: 767,
                settings: {
                    slidesToShow: 2
                }
            }]
        });

    }

    //Up picture
    $('.inputfile:not(.inputfile_custom)').on('change', function(event) {
        for (var i = 0; i < event.target.files.length; i++) {
            var tmppath = URL.createObjectURL(event.target.files[i]);
            var html = '<div class="uploaded-img">' +
                '<div class="up-close"></div>' +
                '<img src="' + tmppath + '" alt="Project Image">' +
                '</div>';
            jQuery(this).parents(".up-img").find(".uploaded-img").remove();
            jQuery(this).closest(".empty-upload").before(html);
        }
    });
    jQuery(document).on('click', '.up-close', function() {
        jQuery(this).closest(".uploaded-img").remove();
    });


    //Up avatar
    $('.inputfile.inputfile_custom').on('change', function(event) {
        for (var i = 0; i < event.target.files.length; i++) {
            var tmppath = URL.createObjectURL(event.target.files[i]);
            jQuery(this).parents('.change-ava').find(".profile-img").find('img').attr('src', tmppath);
        }
    });


    //Edit present modal
    $('#brand-update-present').on('show.bs.modal', function() {
        $('#brand-detail-present').addClass('visibility_hidden')
    });
    $('#brand-update-present').on('hide.bs.modal', function() {
        $('#brand-detail-present').removeClass('visibility_hidden')
    });


    //Menu dropdown if on mobile
    jQuery(document).on('click', '.account-info > a[data-clickable="true"]', function(e) {
        e.preventDefault();
        jQuery(this).next(".account-menu").toggleClass("active");
    });
    jQuery(document).on('click', '.project-menu > .menu-icon[data-clickable="true"]', function(e) {
        e.preventDefault();
        jQuery(this).next(".project-menu-ul").toggleClass("active");
    });

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
    var car_slider_option = {
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: false,
        loop: true,
        dots: false,
        responsive: {
            0: {
                items: 1,
            },
            480: {
                items: 1,
            },
            767: {
                items: 1,

            },
            991: {
                items: 1,

            },
            1200: {
                items: 1
            }
        }
    }
    $(".car-size-slider .horizontal_slider").owlCarousel(car_slider_option);
    $(".owl-slider .slide_prev").click(function() {
        $(".owl-slider .horizontal_slider").trigger('prev.owl.carousel');
        return false;
    });
    $(".owl-slider .slide_next").click(function() {
        $(".owl-slider .horizontal_slider").trigger('next.owl.carousel');
        return false;
    });


    //Mobile menu new
    function toogle_mobilenav(n){
        if(n=='hide'){
           jQuery('body').removeClass('mobilenav-show');
        }else if(n=='show'){
            jQuery('body').removeClass('mobilenav-show');
        }else{
            jQuery('body').toggleClass('mobilenav-show');
        }
    }
    jQuery('.mobilenav-toggle,.mobilenav-close').click(function(e){
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
    jQuery('.mobilenav-inner li').each(function(){
        var svg =   '<svg width="53.418" height="100.75" viewBox="0 0 53.418 100.75">'+
                        '<path d="M5.193,100.75H3.084A3.079,3.079,0,0,1,.856,95.542L41.94,52.5a3.084,3.084,0,0,0,0-4.254L.856,5.208A3.081,3.081,0,0,1,3.084,0H5.193A3.076,3.076,0,0,1,7.42.954L52.563,48.248a3.084,3.084,0,0,1,0,4.254L7.42,99.8A3.076,3.076,0,0,1,5.193,100.75Z" transform="translate(0.004 0)"/>'+
                    '</svg>';
        if(jQuery(this).children('ul').length != 0){
            jQuery(this).addClass('has-sub');
            jQuery(this).children('a').wrap('<div class="has-sub-toggle"></span>');
            jQuery(this).children('.has-sub-toggle').append('<span class="toggle-mobilenav-sub">'+svg+'</span>');
        }
    });
    jQuery(document).on('click', '.toggle-mobilenav-sub', function(){
        jQuery(this).toggleClass('active');
        jQuery(this).closest('.has-sub').children('ul').slideToggle();
    });

    //Scroll menu target
    $("header .scroll-target").click(function(e) {
        e.preventDefault();
        var id = $(this).attr('href');
        var header_height = parseInt(jQuery("header").outerHeight());
        $('html,body').animate({
            scrollTop: parseInt($(id).offset().top - header_height + 62)
        }, 'slow');
        $(this).closest('ul').find('li').removeClass('active');
        $(this).closest('li').addClass('active');
    });
    $(".mobilenav .scroll-target").click(function(e) {
        e.preventDefault();
        jQuery('body').removeClass('mobilenav-show');
        var id = $(this).attr('href');
        var header_height = parseInt(jQuery("header").outerHeight());
        $('html,body').animate({
            scrollTop: parseInt($(id).offset().top - header_height + 30)
        }, 'slow');
        $(this).closest('ul').find('li').removeClass('active');
        $(this).closest('li').addClass('active');
    });
    //Back to top
    $('#back-to-top').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    jQuery('.language-toolbox .language-selector').click(function(e) {
        e.preventDefault();
        jQuery(this).parents(".language-toolbox").toggleClass("active");
    });

});
//--DOCUMENT READY FUNCTION END

//--WINDOW LOADED FUNCTION BEGIN
jQuery(window).bind("load", function() {

});
//--WINDOW LOADED FUNCTION END

//--WINDOW RESIZE FUNCTION BEGIN
jQuery(window).resize(function() {
    account_clickable();
    body_padding_top();
});
//--WINDOW RESIZE FUNCTION END
jQuery(window).scroll(function() {
    //Back to top
    if ($(this).scrollTop() > 50) {
        $('#back-to-top').fadeIn(600);
    } else {
        $('#back-to-top').fadeOut(600);
    }
});
