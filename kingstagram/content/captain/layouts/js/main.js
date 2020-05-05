html2element: (function($) {
    'use strict';

    // Switch View
    // ====================
    $(document).ready(function() {
        var csshref = localStorage["fav"];
        if (csshref) {
            $("#switchview").prop("class", csshref);
        }
        var activeid = localStorage["activeid"];
        if (activeid) {
            $("#" + activeid).prop("checked", true).closest("label").addClass("active");
        }

        $('#btn-switch [type="radio"]').on("change", function() {
            $("#switchview").attr("class", $(this).data('color'));
            localStorage.setItem('fav', $(this).data('color'));
            localStorage.setItem('activeid', $(this).prop('id'));
            return false;
        });
    });
        function calc_video_div_heigh(){
          $('.parent_video_floating').attr("data-height", $('.parent_video_floating').outerHeight());      
        }
        if ($(".is_video_floating").length != 0) {
            $(document).ready(function() {
              calc_video_div_heigh();
            });

            $(window).resize(function() {
              calc_video_div_heigh();
            });
            $(window).scroll(function() {
                var hH = parseInt($('.parent_video_floating').attr('data-height')),
                    hT = $('.parent_video_floating').offset().top,             
                    wH = $(window).height(),
                    wS = $(this).scrollTop();
                if (wS > (hT + hH)) {
                    console.log("is stick");
                    $('.is_video_floating').addClass("is_stuck");
                } else {
                    console.log("not stick");
                    $('.is_video_floating').removeClass("is_stuck");
                }
            });
        }



    // Header search active
    // ====================
    $(document).ready(function() {

        $(".header-search-form").click(function(event) {
            event.stopPropagation();
            $("div.king-search").addClass("active");
        });

        $(document).on("click", function() {

            $("div.king-search").removeClass("active");
        });


    });
    // Sticky ad in sidebar
    // ====================
    $(document).ready(function() {
        $(".sidebar-ad").stick_in_parent({
            parent: "#primary",
            offset_top: 80
        });
    });
    // BACK TO TOP
    // ====================
    $(document).ready(function() {
        // =========== BACK TO TOP ==========
        $('#back-to-top').click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 300);
            return false;
        });
    });
    $(window).scroll(function() {
        // =========== BACK TO TOP ==========
        if ($(this).scrollTop() > 50) {
            $('#back-to-top').addClass("active");
        } else {
            $('#back-to-top').removeClass("active");
        }
    });

    // bootstrap loading state
    // ====================
    $(document).ready(function() {
        $("#king-submitbutton").click(function() {
            var $btn = $(this).find('#king-submitbutton');
            $btn.button('loading');
        });
    });
})(jQuery);