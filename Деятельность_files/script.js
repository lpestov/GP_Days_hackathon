$(document).ready(function () {

    // проверка инпута в header на наличие текста
    $(".search-h input").on("keyup", function(){
        if($(this).val().length < 1){
            $(this).removeClass('active');
        }else{
            $(this).addClass('active');
        }
    });
    //--------------------------------------------
    // Очистка значения инпута и удаление активного класса
    $('.clean').click(function () {
        $(".search-h input").val('')
        $(".search-h input").removeClass('active');
    });
    //--------------------------------------------
    $('.open-mobile-search').click(function () {
        $(this).parents('.search-h').toggleClass('open')
        $(".search-h input").removeClass('active');
    });
    //--------------------------------------------
    // открытие мобильного меню
    $('.hamburger').click(function () {
        $(this).toggleClass('is-active')
        $('body').toggleClass('open-mobile-menu')
    });
    //--------------------------------------------

    $('.owl-link').owlCarousel({
        loop:false,

        nav:true,
        responsive:{
            0:{
                items:1,
                slideBy:1,
            },
            768:{
                items:3,
                slideBy:3,
                margin:16,
            },
            992:{
                items:4,
                slideBy:4,
                margin:16,
            },
            1200:{
                items:4,
                slideBy:4,
                margin:32,
            }
        }
    });
    //--------------------------------------------
    $('.owl-banner').owlCarousel({
        loop:false,
        margin:10,
        nav:true,
        items:1,
        autoplay:true,
        autoplayTimeout:8000,
        autoplayHoverPause:true,
        dots:false
    })


    //--------------------------------------------
    // input file
    var inputs = document.querySelectorAll('.file-input')
    for (var i = 0, len = inputs.length; i < len; i++) {
        customInput(inputs[i])
    }
    function customInput (el) {
        const fileInput = el.querySelector('[type="file"]')
        const label = el.querySelector('[data-js-label]')
        fileInput.onchange =
            fileInput.onmouseout = function () {
                if (!fileInput.value) return
                var value = fileInput.value.replace(/^.*[\\\/]/, '')
                el.className += ' -chosen'
                label.innerText = value
            }
    }
    //--------------------------------------------
    // tab
    $('.tab-nav').on('click', 'li:not(.active)', function() {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('.tabBox').find('.tab-wrap .tabs__content').removeClass('active').eq($(this).index()).addClass('active');
    });
    //--------------------------------------------

    // синхронизировавшийся слайдер
    $('.owl-syncing').owlCarousel({
        loop:false,
        margin:10,
        items:1,
        dots:false,
        nav:true,
        URLhashListener:true,
        autoHeight:true,
    });
    $('.owl-syncing-nav').owlCarousel({
        loop:false,
        margin:20,
        nav:false,
        dots:false,
        URLhashListener:true,
        responsive : {
            0 : {
                items:2,
            },
            450 : {
                items:3,
            },
            992 : {
                items:4,
            },
            1200 : {
                items:5,
            },
        }
    });
    //--------------------------------------------

    // fancybox
    $('[data-fancybox]').fancybox();
    //--------------------------------------------
    // оборачиваю таблиц в div class=scroll-wrap для добавления горизонтального скролла на телефоне
    $('.static table').wrap("<div class='scroll-wrap'></div>");
    //--------------------------------------------

    // ленивая загрузка
    $('[data-src]').Lazy();
    //--------------------------------------------
    // радиокнопки на странице Анкета
    $('.questionnaire-section .wrap-input:nth-child(1) .radio-wrap').click(function () {
        $('.questionnaire-section .wrap-input:nth-child(2)').removeClass('opacity')
    });
    $('.questionnaire-section .wrap-input:nth-child(2) .radio-wrap').click(function () {
        $('.questionnaire-section .wrap-input:nth-child(3)').removeClass('opacity')
    });
    //--------------------------------------------
    // owlCarousel на странице Онкоскрининг, Диспансерное
    $('.owl-text').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        dots:true,
        items:1,
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:true
    });
    //--------------------------------------------
    // "Показать еще" на странице Онкоскрининг, Диспансерное в мобильной версии
    $('.address-section .show-more').click(function () {
        $('.table-address').addClass('open-all');
        $(this).hide()
    });
    //--------------------------------------------
    // активное меню, анимация якоря
    $('a[href^="#"]').click(function () {
        var target = $(this).attr('href');
        $('html, body').animate({scrollTop: $(target).offset().top - 16}, 400);
        return false;
    });
    //--------------------------------------------
    // прилипание header на странице Онкоскрининг, Диспансерное
    var hdr = $('.wrap-fix');
    var hh = hdr.outerHeight();
    $('.header-min').css('height', hh)
    $(window).scroll(function(){
        if($(this).scrollTop() >= hh)
            hdr.addClass('fix');
        else
            hdr.removeClass('fix');
    })
    //--------------------------------------------

    // nav screening
    if($('#position1, #position2, #position3, #position4, #position5').length){
        $(window).scroll(function() {
            var Scroll = $(window).scrollTop() + 100,
                SectionOneOffset = $('#position1').offset().top,
                SectionTwoOffset = $('#position2').offset().top;
            SectionThreeOffset = $('#position3').offset().top;
            SectionFourOffset = $('#position4').offset().top;

            if (Scroll >= SectionOneOffset) {
                $(".nav-anchor li:nth-child(1) a").addClass("active");
            } else {
                $(".nav-anchor li:nth-child(2) a").removeClass("active");
            }
            if (Scroll >= SectionTwoOffset) {
                $(".nav-anchor li:nth-child(2) a").addClass("active");
                $(".nav-anchor li:nth-child(1) a").removeClass("active");
            } else {
                $(".nav-anchor li:nth-child(2) a").removeClass("active");
            }
            if (Scroll >= SectionThreeOffset) {
                $(".nav-anchor li:nth-child(3) a").addClass("active");
                $(".nav-anchor li:nth-child(2) a").removeClass("active");
            } else {
                $(".nav-anchor li:nth-child(3) a").removeClass("active");
            }
            if (Scroll >= SectionFourOffset) {
                $(".nav-anchor li:nth-child(4) a").addClass("active");
                $(".nav-anchor li:nth-child(3) a").removeClass("active");
            } else {
                $(".nav-anchor li:nth-child(4) a").removeClass("active");
            }
        });
    }


    // nav dispensary
    if($('#dispensary1, #dispensary2, #dispensary3, #dispensary4').length){
        $(window).scroll(function() {
            var Scroll2 = $(window).scrollTop() + 100,
                dispensary1 = $('#dispensary1').offset().top,
                dispensary2 = $('#dispensary2').offset().top;
            dispensary3 = $('#dispensary3').offset().top;

            if (Scroll2 >= dispensary1) {
                $(".nav-anchor li:nth-child(1) a").addClass("active");
            } else {
                $(".nav-anchor li:nth-child(2) a").removeClass("active");
            }
            if (Scroll2 >= dispensary2) {
                $(".nav-anchor li:nth-child(2) a").addClass("active");
                $(".nav-anchor li:nth-child(1) a").removeClass("active");
            } else {
                $(".nav-anchor li:nth-child(2) a").removeClass("active");
            }
            if (Scroll2 >= dispensary3) {
                $(".nav-anchor li:nth-child(3) a").addClass("active");
                $(".nav-anchor li:nth-child(2) a").removeClass("active");
            } else {
                $(".nav-anchor li:nth-child(3) a").removeClass("active");
            }
        });
    }
    //--------------------------------------------

    // отключаем, разрешаем скролл карты на странице screening, dispensary
    $(".map-address, .map-wrap").click(function () {
        $(this).addClass("remove-layer")
    });
    $(".map-address, .map-wrap").mouseleave(function () {
        $(this).removeClass("remove-layer")
    });
    //--------------------------------------------

    $('img').addClass('loader-img')
    $(window).on('load', function() {
        $('img').removeClass('loader-img')
    });
});


