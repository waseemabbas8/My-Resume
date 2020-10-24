/*-----------------------------------------------------------------
/*    Project         : Ashton - Resume / vCard / Portfolio Template*/
/*    Version         : v1.0 */
/*    Last update     : April, 2019*/
/*    Author          : ThemeChoose*/
/*    Support email   : https://themeforest.net/user/themechoose*/
/*-----------------------------------------------------------------*/
$.noConflict();
jQuery(function ($) {
    'use strict';
    //preloader + Malihu scroll
    //=================================
    $(window).ready(function () {
        setTimeout(function () {
            $('#spinner').fadeOut('slow', function () {});
        }, 800);
        $("header.header").mCustomScrollbar({
            theme: "dark-thin",
            mouseWheelPixels: 80,
            setTop: 0,
            setLeft: 0,
            axis: "y",
            scrollbarPosition: "inside",
            scrollInertia: 200,
            autoDraggerLength: !0,
            alwaysShowScrollbar: 0,
            snapOffset: 0
        });
    });
    /*
    Imag loaded
    ==============*/
    $('#portfolio').imagesLoaded()
        .progress(function (instance, image) {
            var result = image.isLoaded ? 'loaded' : 'broken';
        });
    /*
    awesome hover
    ================*/
    $('#da-thumbs .portfolio-item').each(function () {
        $(this).hoverdir({
            speed: 500,
            easeing: 'ease-in-out',
            hoverDelay: 50,
            inverse: false
        });
    });
    /*
    form validate
    ===================*/
    $(".contact_form").validate();
    /*
    full-screen layout
    ===================*/
    $('ul.navbar-nav li.nav-item a.nav-link, .home a.btn, .about .btn.my_blog').on('click', function () {
        $('ul.navbar-nav li.nav-item a.nav-link').removeClass('active');
        $(this).addClass('active');
        var tagid = $(this).attr('href');
        $('.page').removeClass('page-current');
        $('' + tagid).addClass('page-current');
    });
    /*
    Count-up
    ==========*/
    $('.count-up, .progress-bar .label').each(function () {
        var $this = $(this),
            countTo = $this.attr('data-count');
        $({
            countNum: $this.text()
        }).animate({
            countNum: countTo
        }, {
            duration: 5000,
            easing: 'linear',
            step: function () {
                $this.text(Math.floor(this.countNum));
            },
            complete: function () {
                $this.text(this.countNum);
                //alert('finished');
            }
        });
    });

    /*
    Magnific popup for image
    =========================*/
    var groups = {};
    $('.image-link').each(function () {
        var id = parseInt($(this).attr('data-group'), 9);
        if (!groups[id]) {
            groups[id] = [];
        }
        groups[id].push(this);
    });
    $.each(groups, function () {
        $(this).magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            closeBtnInside: true,
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300 // don't foget to change the duration also in CSS
            }
        });
    });

    $('.video-link, .map').magnificPopup({
        disableOn: 250,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    /*
    Portfolio Details
    ==========================*/
    /* Don't work without live server */
    $('.portfolio-details').magnificPopup({
        type: 'ajax',
        closeOnContentClick: false,
        closeOnBgClick: false,
        closeBtnInside: true,
        enableEscapeKe: true,
        showCloseBtn: true,
        overflowY: 'auto',
        disableOn: 250
    });

    /*
    gallery isotope
    ================*/
    $('.filter').isotope({
        itemSelector: '.filter-item',
        stagger: 30,
        transitionDuration: 500
    });
    // Add isotope click function
    $('.filter-btn').on('click', 'li', function () {
        $('.filter-btn li').removeClass('active');
        $(this).addClass('active');
        var filterValue = $(this).attr('data-filter');
        $('.filter').isotope({
            filter: filterValue,
            animationDuration: 750,
            easing: 'linear'
        });
        $('.filter .filter-item').css({
            position: 'absolute'
        });
    });
    $('.filter .filter-item').css({
        position: 'relative'
    });
    $('#da-thumbs').css({
        height: '100%'
    });

    /*Mobile Menu
    ===============*/
    $('.navbar-toggler').click(function () {
        $('.navbar-collapse').slideToggle(800);
    });

    /*
    ajax contact form
    ===================*/
    var form = $('.contact_form'),
        message = $('.contact_msg'),
        form_data;
    // Success function
    function done_func(response) {
        message.fadeIn().removeClass('alert-danger').addClass('alert-success');
        message.text(response);
        setTimeout(function () {
            message.fadeOut();
        }, 2000);
        form.find('input:not([type="submit"]), textarea').val('');
    }
    // fail function
    function fail_func(data) {
        message.fadeIn().removeClass('alert-success').addClass('alert-success');
        message.text(data.responseText);
        setTimeout(function () {
            message.fadeOut();
        }, 2000);
    }
    form.submit(function (e) {
        e.preventDefault();
        form_data = $(this).serialize();
        $.ajax({
                type: 'POST',
                url: form.attr('action'),
                data: form_data
            })
            .done(done_func)
            .fail(fail_func);
    });
});
