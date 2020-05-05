function formatDate(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date = dd + '/' + mm + '/' + yyyy;
    return date; //string dd/mm/yyyy
}

function addDate(dateString) {
    date = new Date();
    date.setDate(Number(dateString.slice(0, 2)));
    date.setMonth(Number(dateString.slice(3, 5)) - 1);
    return date;
}

function getNextDate(date) {
    nextDate = new Date();
    nextDate.setDate(Number(date.slice(0, 2)) + 1);
    if (Number(date.slice(0, 2)) === 31) {
        nextDate.setMonth(Number(date.slice(3, 5)));
    }
    nextDate = formatDate(nextDate);
    return nextDate; //string
}

var commonHome = {
    init: function() {
        jQuery(document).on('click', '.account_close', function() {
            $(this).closest("form").slideUp(500);
        });
        jQuery(document).on('click', '.btn-signup-inLogin', function(e) {
            e.preventDefault();
            $(this).closest("form").slideUp(500);
            $('form.account.signup').slideDown(500);
        });
        commonHome.account('.section-login', '.btn-login', '.login');
        //commonHome.account('.section-login', '.btn-forgotPassword', '.forgot-password');
        $('body').mouseup(function(e) {
            if ($(e.target).closest('.section-login').length === 0) {
                $('.section-login .forgot-password').slideUp(500);
            }
        });
        $('.btn-forgotPassword').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.section-login').find('.login').slideUp(500);
            $(this).closest('.section-login').find('.forgot-password').slideToggle(500);
        });
        commonHome.account('.section-signup', '.btn-signup', '.signup');
        $('.custom-label-input input').focusin(function() {
            $(this).closest('.custom-label-input').css('border', '1px solid rgba(2, 28, 112, 0.50)');
        });
        $('.custom-label-input input').focusout(function() {
            $(this).closest('.custom-label-input').css('border', '1px solid #E3E3E3');
        });
        $('.custom-label-input .visible-password').off('click').on('click', function(e) {
            e.preventDefault();
            $(this).find('input').toggleClass('checked');
            if ($(this).find('input').hasClass('checked')) {
                $(this).closest('.custom-label-input').find('.txt').find('input[type="password"]').attr('type', 'text');
            } else {
                $(this).closest('.custom-label-input').find('.txt').find('input[type="text"]').attr('type', 'password');
            }
        });
        commonHome.search_bar();
        $('.btn-round-trip').on("click", function() {
            $(this).closest('.custom-form-icon').find('.normal-trip').removeClass('d-none').addClass('d-flex');
            $(this).closest('.round-trip').addClass('d-none');
        });
        $('.btn-normal-trip').on("click", function() {
            $(this).closest('.custom-form-icon').find('.btn-round-trip').removeAttr('checked');
            $(this).closest('.normal-trip').removeClass('d-flex').addClass('d-none');
            $(this).closest('.custom-form-icon').find('.round-trip').removeClass('d-none');
        });

        commonHome.date_picker('#day-start-1', 'Chọn ngày đi', new Date());
        commonHome.date_picker('#day-start-2', 'Chọn ngày đi', new Date());

        carDate = new Date();
        carDateBack = new Date();

        commonHome.sticky_menu();
        commonHome.init_slick_arrow();
        commonHome.init_brand_slick_arrow();
        commonHome.init_slick_no_arrow();
        commonHome.best_ticket_load();
        commonHome.countdown_time("2019/08/05");
        $('body').off("click").on("click", '.form-subcribe', function(e) {
            e.preventDefault();
            $('.input-default').focusin(function() {
                $(this).closest('div').find('label').css('color', '#FF574B');
                $(this).closest('.d-flex').find('.icon').css('color', '#FF574B');
            });
            $('.input-default').focusout(function() {
                $(this).closest('div').find('label').css('color', '#aaa');
                $(this).closest('.d-flex').find('.icon').css('color', '#aaa');
            });
            commonHome.departure_pick();
            commonHome.arrival_pick();
        });

    },
    sticky_menu: function() {
        var pos = jQuery("nav.navbar").offset().top;
        jQuery(window).scroll(function() {
            var posScroll = jQuery(window).scrollTop();
            if (parseInt(posScroll) > parseInt(pos)) {
                jQuery("nav.navbar").addClass("is-ticky");
            } else {
                jQuery("nav.navbar").removeClass("is-ticky");
            }
        });
    },
    account: function(sectionClass, buttonClass, formClass) {
        $('body').mouseup(function(e) {
            if ($(e.target).closest(sectionClass).length === 0) {
                $(sectionClass + ' ' + formClass).slideUp(500);
            }
        });
        $(buttonClass).on('click', function(e) {
            e.preventDefault();
            $(formClass).not($(this).closest(sectionClass).find(formClass)).slideUp(500);
            $(this).closest(sectionClass).find(formClass).slideToggle(500);
        });
    },
    search_bar: function() {
        $('.tab-option').on("click", function() {
            $('.tab-option').not(this).removeClass('active');
        });
        if(jQuery(window).width() > 767){
            $('#tab_1_1').on("click", function() {
                $('.top-searchbar').find('.expand').slideToggle(500, function() {
                    $('.input-default').focusin(function() {
                        $(this).closest('div').find('label').css('color', '#FF574B');
                        $(this).closest('.d-flex').find('.icon').css('color', '#FF574B');
                    });
                    $('.input-default').focusout(function() {
                        $(this).closest('div').find('label').css('color', '#aaa');
                        $(this).closest('.d-flex').find('.icon').css('color', '#aaa');
                    });
                    commonHome.arrival_pick();
                    commonHome.departure_pick();
                    commonHome.customer_select();
                    commonHome.time_select();
                }).removeClass('expand').addClass('expanded');
            });
        }else{
            commonHome.arrival_pick();
            commonHome.departure_pick();
            commonHome.customer_select();
            commonHome.time_select();
        }

    },
    arrival_pick: function() {
        $('body').mouseup(function(e) {
            if ($(e.target).closest('.plane-end').length === 0) {
                $('.plane-end .arrival').slideUp(500);
            }
        });
        $('.arrival-text').off('click').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.plane-end').find('.arrival').slideToggle(500);
        });
        $('.plane-end .arrival ul li').on('click', function() {
            $(this).closest('.plane-end').find('.arrival-text').val($(this).text().trim());
            $('.plane-end .arrival').slideUp(500);
        });
    },
    departure_pick: function() {
        $('body').mouseup(function(e) {
            if ($(e.target).closest('.plane-start').length === 0) {
                $('.plane-start .departure').slideUp(500);
            }
        });
        $('.departure-text').off('click').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.plane-start').find('.departure').slideToggle(500);
        });
        $('.plane-start .departure ul li').on('click', function() {
            $(this).closest('.plane-start').find('.departure-text').val($(this).text().trim());
            $('.plane-start .departure').slideUp(500);
            $(this).closest('.custom-form-inline').find('.plane-end .arrival').slideDown(500, function() {
                $(this).closest('.plane-end').find('.arrival-text').focus();
            });
        });
    },
    customer_select: function() {
        $('body').mouseup(function(e) {
            if ($(e.target).closest('.customers').length === 0) {
                $('.customers .customers-select').slideUp(500, function() {
                    $(this).closest('.customers').find('label').css('color', '#aaa');
                    $(this).closest('.d-flex').find('.icon').css('color', '#aaa');
                });
            }
        });
        $('.customer').off('click').on('click', function(e) {
            e.preventDefault();
            $('.customers .customers-select').not($(this).closest('.customers').find('.customers-select')).slideUp(500);
            $(this).closest('.customers').find('.customers-select').slideToggle(500, function() {
                $(this).closest('.customers').find('label').css('color', '#FF574B');
                $(this).closest('.d-flex').find('.icon').first().css('color', '#FF574B');
            });
        });
        $('body').off("click").on("click", '.customers .customers-select .change', function(e) {
            e.preventDefault();
            var oldValue = $(this).parent().find("input").val();
            var maxValue = $(this).parent().find("input").data('max');
            var target = $(this).parent().find("input").data('target');
            var newVal;
            if ($(this).hasClass("plus")) {
                if (oldValue < maxValue) {
                    newVal = parseInt(oldValue) + 1;
                } else {
                    newVal = oldValue;
                }
            } else {
                if (oldValue > 0) {
                    newVal = parseInt(oldValue) - 1;
                } else {
                    newVal = 0;
                }
            }
            $(this).parent().find(".txt-value").text(newVal);
            $(this).parent().find("input").val(newVal);
            $(this).closest('.customers').find('.' + target).text(newVal);
        }).on("click", '.customers .customers-select .pick-rooms', function(e) {
            var target = $(this).parent().find("input").data('target');
            $(this).parent().find("input").val($(this).val());
            $(this).closest('.customers').find('.' + target).text($(this).val());
        });
    },
    time_select: function() {
        $('body').mouseup(function(e) {
            if ($(e.target).closest('.times').length === 0) {
                $('.times .time-select').slideUp(500);
            }
        });
        $('.time').off('click').on('click', function(e) {
            e.preventDefault();
            $('.times .times-select').not($(this).closest('.times').find('.time-select')).slideUp(500);
            $(this).closest('.times').find('.time-select').slideToggle(500);
        });
        $('.time-submit').on('click', function() {
            var hour = $(this).closest('.time-select').find('.pick-hour').val();
            var minute = $(this).closest('.time-select').find('.pick-minute').val();
            $(this).closest('.times').find('.time').val(hour + ':' + minute);
            $('.times .time-select').slideUp(500);
        });
    },
    date_picker: function(selector, titles, startDate) {
        var newDate = formatDate(startDate);
        $(selector).val(newDate);
        $(selector).dateRangePicker({
            autoClose: true,
            customTopBar: titles,
            format: 'DD/MM/YYYY',
            singleDate: true,
            showShortcuts: false,
            singleMonth: true,
            startDate: startDate,
            showDateFilter: function(time, date) {
                var day = formatDate(new Date(time));
                var s = day.split("/");
                var ngayAm = getLunarDate(parseInt(s[0]), parseInt(s[1]), parseInt(s[2]));
                var str = '<div>' + date + '</div>' + '<span class="lunar-day">' + ngayAm.day + '</span>';
                return str;
            },
            language: 'vi',
            customArrowPrevSymbol: '<span class="icon icon-ic_left"></span>',
            customArrowNextSymbol: '<span class="icon icon-ic_right"></span>'
        });
        $(selector).click(function(evt) {
            evt.stopPropagation();
            $(selector).data('dateRangePicker');
        });
    },
    range_picker: function(parentSelector, selector1, selector2, titles1, titles2, startDate) {
        var newDate = formatDate(startDate);
        $(selector1).val(newDate);
        $(selector2).val(getNextDate(newDate));
        $(selector1).dateRangePicker({
            autoClose: true,
            customTopBar: titles1,
            format: 'DD/MM/YYYY',
            singleDate: true,
            showShortcuts: false,
            singleMonth: false,
            startDate: startDate,
            showDateFilter: function(time, date) {
                var day = formatDate(new Date(time));
                var s = day.split("/");
                var ngayAm = getLunarDate(parseInt(s[0]), parseInt(s[1]), parseInt(s[2]));
                var str = '<div>' + date + '</div>' + '<span class="lunar-day">' + ngayAm.day + '</span>';
                return str;
            },
            language: 'vi',
            customArrowPrevSymbol: '<span class="icon icon-ic_left"></span>',
            customArrowNextSymbol: '<span class="icon icon-ic_right"></span>'
        }).bind('datepicker-change', function() {
            start = $(selector1).val();
            end = new Date();
            end = getNextDate(start);
            $(selector2).val(end);
            $(selector2).data('dateRangePicker');
            $(selector2).dateRangePicker({
                autoClose: true,
                customTopBar: titles2,
                format: 'DD/MM/YYYY',
                singleDate: true,
                showShortcuts: false,
                singleMonth: false,
                startDate: end,
                showDateFilter: function(time, date) {
                    var day = formatDate(new Date(time));
                    var s = day.split("/");
                    var ngayAm = getLunarDate(parseInt(s[0]), parseInt(s[1]), parseInt(s[2]));
                    var str = '<div>' + date + '</div>' + '<span class="lunar-day">' + ngayAm.day + '</span>';
                    return str;
                },
                language: 'vi',
                customArrowPrevSymbol: '<span class="icon icon-ic_left"></span>',
                customArrowNextSymbol: '<span class="icon icon-ic_right"></span>'
            });
            if ($(parentSelector).find('#round-trip:checked').length !== 0 || $(parentSelector).find('#hotel-round-trip:checked').length !== 0 || $(parentSelector).find('#subcribe-round-trip:checked').length !== 0) {
                $(selector2).focus();
                $(selector2).data('dateRangePicker').open();
            }
        });
    },
    init_slick_arrow: function() {
        $('.section-best-ticket .slick, .section-news .slick').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            autoplay: true,
            prevArrow: '<span class="icon icon-ic_left prev fz-12"></span>',
            nextArrow: '<span class="icon icon-ic_right next fz-12"></span>',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 420,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 320,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    },
    init_brand_slick_arrow: function() {
        $('.section-brand .slick').slick({
            infinite: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            arrows: true,
            autoplay: false,
            prevArrow: '<span class="icon icon-ic_left prev fz-12"></span>',
            nextArrow: '<span class="icon icon-ic_right next fz-12"></span>',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 5
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 420,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 320,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]
        });
    },
    init_slick_no_arrow: function() {
        $('.section-feedback .slick').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 420,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 320,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    },
    filter_slick: function(filterClass) {
        $('.section-best-ticket .slick').slick('slickUnfilter');
        $('.section-best-ticket .slick').slick('slickFilter', filterClass);
    },
    best_ticket_load: function() {
        $('.box-ticket').hover(function() {
            $(this).find('.view-normal').toggleClass('d-none');
            $(this).find('.view-expand').toggleClass('d-none');
        });
        $('#tab1').on('click', function() {
            $('.slick').slick('slickUnfilter');
        });
        $('#tab2').on('click', function() {
            commonHome.filter_slick('.box-new');
        });
        $('#tab3').on('click', function() {
            commonHome.filter_slick('.box-best');
        });
        $('#tab4').on('click', function() {
            commonHome.filter_slick('.box-1way');
        });
        $('#tab5').on('click', function() {
            commonHome.filter_slick('.box-2way');
        });
    },
    // ending date: "yyyy/mm/dd"
    countdown_time: function(ending) {
        $('.clock').countdown(ending, function(event) {
            var totalHours = event.offset.totalDays * 24 + event.offset.hours;
            var $this = $(this).html(event.strftime(
                '<span class="square">' + totalHours + '</span>' +
                '<span class="color-red"> : </span>' +
                '<span class="square">%M</span>' +
                '<span class="color-red"> : </span>' +
                '<span class="square">%S</span>'));
        });
    }
};

//commonHome.init();