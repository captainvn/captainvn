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

function show_popup() {
    if ($.cookie('cookie_popup') == undefined) {
        $('.cookie-popup-wrap').fadeIn(600);
        $.cookie('cookie_popup', true, {
            expires: 0 //số ngày hiện lại
        });
    };
    $('#closepopup').click(function(e) {
        e.preventDefault();
        $('.cookie-popup-wrap').fadeOut(600);
    });
    cookie_popup = (function() {
        if ($.cookie('cookie_popup') == undefined) {
            $('.cookie-popup-wrap').fadeIn(600);
            $.cookie('cookie_popup', true, {
                expires: 0 //số ngày hiện lại
            });
        };
        $('#closepopup').click(function(e) {
            e.preventDefault();
            $('.cookie-popup-wrap').fadeOut(600);
        });
    });
    setTimeout(function() {
        cookie_popup();
    }, 1000); //số miligiây hiện popup sau khi vào trang: 1000 = 1s | 3 phút = 180000
}

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

function check_over() {
    jQuery('.table-responsive').each(function(){
        var element = jQuery(this)[0];
        if (element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth) {
            jQuery(this).closest('.table-responsive-parent').addClass('is_overflow');
        } else {
            jQuery(this).closest('.table-responsive-parent').removeClass('is_overflow');
        }
    });
}
//--DOCUMENT READY FUNCTION BEGIN
jQuery(document).ready(function() {
    if(jQuery('.cookie-popup-wrap').length!=0){
        //show_popup();
    }
    check_over();





    function makeTimer() {

        //      var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");
        var endTimeValue = jQuery("#izone-timer").attr('data-endtime');
        var endTime = new Date(endTimeValue);
        endTime = (Date.parse(endTime) / 1000);

        var now = new Date();
        now = (Date.parse(now) / 1000);

        var timeLeft = endTime - now;

        var days = Math.floor(timeLeft / 86400);
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

        if (hours < "10") { hours = "0" + hours; }
        if (minutes < "10") { minutes = "0" + minutes; }
        if (seconds < "10") { seconds = "0" + seconds; }

        $("#izone-days").html(days + "<span class='text-muted'>Ngày</span>");
        $("#izone-hours").html(hours + "<span class='text-muted'>Giờ</span>");
        $("#izone-minutes").html(minutes + "<span class='text-muted'>Phút</span>");
        $("#izone-seconds").html(seconds + "<span class='text-muted'>Giây</span>");

    }

    setInterval(function() { makeTimer(); }, 1000);

    //body_padding_top();
    account_clickable();
    $('[data-toggle="tooltip"]').tooltip();
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

    var id_count = 0;
    jQuery('.video-youtube').each(function() {
        var id = jQuery(this).attr('data-url').split('watch?v=')[1];
        var hq = 'http://i3.ytimg.com/vi/' + id + '/hqdefault.jpg';
        var hd = 'http://i3.ytimg.com/vi/' + id + '/maxresdefault.jpg';
        jQuery(this).find('.youtube-thumb img').attr('src', hd);
        jQuery(this).find('.youtube-thumb').attr('id', 'youtube_item_'+id_count);
        id_count++;
    });






    jQuery(document).on('click', '.youtube-thumb', function(e) {
        e.preventDefault();
        var id = jQuery(this).attr('id');
        var youtube_id = jQuery(this).closest('.video-youtube').attr('data-url').split('watch?v=')[1];
        var iframe = '<iframe id="iframe_'+id+'" width="560" height="315" src="https://www.youtube.com/embed/' + youtube_id + '?enablejsapi=1&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        jQuery(this).addClass('active');
        jQuery(this).find('.thumb-ratio').html(iframe);
        var div = document.getElementById(id);
        var iframe = div.getElementsByTagName("iframe")[0].contentWindow;
        document.getElementById("iframe_"+id).onload= function() {
            iframe.postMessage('{"event":"command","func":"playVideo","args":""}','*');
        };
    });


    //Home page car slider
    var home_slider_option = {
        nav: true,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        items: 1,
        autoplay: false,
        autoplayTimeout: 6000,
        autoplayHoverPause: false,
        loop: false,
        dots: true,
        //video:true,
        //merge:true,
        //lazyLoad:true
    }
    $("#home-slider").owlCarousel(home_slider_option);
    // $(".owl-slider .slide_prev").click(function() {
    //     $(".owl-slider .horizontal_slider").trigger('prev.owl.carousel');
    //     return false;
    // });
    // $(".owl-slider .slide_next").click(function() {
    //     $(".owl-slider .horizontal_slider").trigger('next.owl.carousel');
    //     return false;
    // });
    $("#gv-slider").owlCarousel({
        nav: true,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        items: 3,
        autoplay: false,
        autoplayTimeout: 6000,
        autoplayHoverPause: false,
        loop: true,
        dots: true,
        margin: 24,
        responsive: {
            0: {
                items: 1,
            },
            480: {
                items: 2,
            },
            767: {
                items: 2,

            },
            991: {
                items: 3,

            },
            1200: {
                items: 3
            }
        }
    });
    $("#course-slider").owlCarousel({
        nav: true,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        autoplay: false,
        autoplayTimeout: 6000,
        autoplayHoverPause: false,
        loop: true,
        dots: true,
        margin: 24,
        responsive: {
            0: {
                items: 1,
            },
            480: {
                items: 2,
            },
            767: {
                items: 2,

            },
            991: {
                items: 3,

            },
            1200: {
                items: 4
            }
        }
    });
    $("#hs-slider").owlCarousel({
        nav: true,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        autoplay: false,
        autoplayTimeout: 6000,
        autoplayHoverPause: false,
        loop: false,
        dots: true,
        margin: 24,
        responsive: {
            0: {
                items: 1,
            },
            480: {
                items: 2,
            },
            767: {
                items: 2,

            },
            991: {
                items: 3,

            },
            1200: {
                items: 3
            },
            1366: {
                items: 4
            }
        }
    });
    $("#phanhoi-slider").owlCarousel({
        nav: false,
        navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
        autoplay: false,
        autoplayTimeout: 6000,
        autoplayHoverPause: false,
        loop: false,
        dots: true,
        margin: 12,
        responsive: {
            0: {
                items: 1,
            },
            480: {
                items: 2,
            },
            767: {
                items: 2,

            },
            991: {
                items: 3,

            },
            1200: {
                items: 3
            },
            1366: {
                items: 3
            }
        }
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


    jQuery(document).on('click', '.curriculum-chapter', function(){
        jQuery(this).next('.chapter-lessons').slideToggle();
    });


    //Back to top
    $('.cd-top').click(function() {
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
    check_over();
    //body_padding_top();
});


var lastId,
    topMenu = $("#market-statistics-nav"),
    topMenuHeight = topMenu.outerHeight() + 100,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function() {
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

menuItems.click(function(e) {
    var href = $(this).attr("href");
    var id = href.replace('#', '');
    jQuery('.scroll-target-item').removeClass('active');
    jQuery('#' + id).addClass('active');
    offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 100;
    $('html, body').stop().animate({
        scrollTop: offsetTop - 100
    }, 300);
    e.preventDefault();
});

$(window).scroll(function() {
    var fromTop = $(this).scrollTop() + topMenuHeight;

    var cur = scrollItems.map(function() {
        if ($(this).offset().top - 100 < fromTop)
            return this;
    });
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        menuItems.removeClass("active")
        menuItems.filter("[href='#" + id + "']").addClass("active");
    } else {

    }



    sticky_header();
    //Back to top
    if ($(this).scrollTop() > 50) {
        $('.cd-top').addClass('cd-is-visible');
    } else {
        $('.cd-top').removeClass('cd-is-visible');
    }

});
