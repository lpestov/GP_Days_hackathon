$(document).ready(function () {

    //капча открытый ключ
    var recaptcha_pub_key = document.getElementById("recaptcha_pub_key").value;


    //валидация email
    function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test( $email );
    }

    let ajax_feedback_form = '/local/ajax/feedback_form.php';
    let ajax_questions_form = '/local/ajax/questions_form.php';
    let ajax_estimate_form = '/local/ajax/estimate_form.php';
    let ajax_corruption_form = '/local/ajax/corruption_form.php';

    // let ajax_feedback_form_copy = '/local/ajax/feedback_form_copy.php';

    //форма интернет-приемная
    // $('#feedback_form_send').on('click', function(){
    //     let form1 = document.getElementById("feedback_form");
    //
    //     let form = $("#feedback_form"),
    //         theme = $(form).find('select[name=THEME]'),
    //         lastname = $(form).find('input[name=LASTNAME]'),
    //         firstname = $(form).find('input[name=FIRSTNAME]'),
    //         secondname = $(form).find('input[name=SECONDNAME]'),
    //         phone = $(form).find('input[name=PHONE]'),
    //         address = $(form).find('input[name=ADDRESS]'),
    //         email = $(form).find('input[name=EMAIL]'),
    //         text = $(form).find('input[name=TEXT]'),
    //
    //         file = $(form).find('input[name=FILE]'),
    //
    //         policy = $(form).find('input[name=POLICY]');
    //
    //     $(form).find("input").removeClass("is-invalid");
    //     $(form).find("select").removeClass("is-invalid");
    //
    //     //theme
    //     if ($(theme).val() ==''){
    //         $(theme).addClass("is-invalid");
    //         return false;
    //     }
    //     //lastname
    //     else if ($(lastname).val() ==''){
    //         $(lastname).addClass("is-invalid");
    //         return false;
    //     }
    //     //firstname
    //     else if ($(firstname).val() ==''){
    //         $(firstname).addClass("is-invalid");
    //         return false;
    //     }
    //     else if (!$(policy).is(":checked")){
    //         $(policy).addClass("is-invalid");
    //         return false;
    //     }
    //     else {
    //
    //         let Data = new FormData(form1);
    //         $.ajax({
    //             type: "POST",
    //             url: ajax_feedback_form, //Change
    //             data: Data,
    //             async: false,
    //             cache: false,
    //             contentType: false,
    //             processData: false,
    //         }).done(function (data) {
    //             console.log(data);
    //
    //             if (data == 1){
    //                 //вывод модалки об успешной отправке
    //                 $('#success_modal').modal('show');
    //
    //                 //очистка поля телефон
    //                     $(theme).val("");
    //                     $(lastname).val("");
    //                     $(firstname).val("");
    //                     $(secondname).val("");
    //                     $(phone).val("");
    //                     $(address).val("");
    //                     $(email).val("");
    //                     $(text).val("");
    //                     $(file).val();
    //                     $(policy).val();
    //             }
    //         });
    //         return false;
    //     }
    // });


    //форма интернет-приемная
    $('#feedback_form_send').on('click', function(){

        let form1 = document.getElementById("feedback_form");
        let valid = 1;

        let form = $("#feedback_form"),
            theme = $(form).find('select[name=THEME]'),
            lastname = $(form).find('input[name=LASTNAME]'),
            firstname = $(form).find('input[name=FIRSTNAME]'),
            secondname = $(form).find('input[name=SECONDNAME]'),
            phone = $(form).find('input[name=PHONE]'),
            address = $(form).find('input[name=ADDRESS]'),
            email = $(form).find('input[name=EMAIL]'),
            text = $(form).find('textarea[name=TEXT]'),
            token = $(form).find('input[name=TOKEN]'),

            file = $(form).find('input[name=FILE]'),

            policy = $(form).find('input[name=POLICY]');


        //получение токена google captcha
        let captcha_token = grecaptcha.getResponse();
            $(token).val(captcha_token);

        $(form).find("input").removeClass("is-invalid");
        $(form).find("select").removeClass("is-invalid");
        $(form).find("textarea").removeClass("is-invalid");

        //theme
        if ($(theme).val() ==''){
            valid = 0;
            $(theme).addClass("is-invalid");
        }
        //lastname
        if ($(lastname).val() ==''){
            valid = 0;
            $(lastname).addClass("is-invalid");
        }
        //firstname
        if ($(firstname).val() ==''){
            valid = 0;
            $(firstname).addClass("is-invalid");
        }
        //address
        if($(address).val() == ''){
            valid = 0;
            $(address).addClass("is-invalid");
        }
        //email
        // if($(email).val() == ''){
        //     valid = 0;
        //     $(email).addClass("is-invalid");
        // }
        // //email valid
        // if(!validateEmail($(email).val())){
        //     valid = 0;
        //     $(email).addClass("is-invalid");
        // }
        //text
        if ($(text).val() ==''){
            valid = 0;
            $(text).addClass("is-invalid");
        }
        //captcha
        if ($(token).val() == ''){
            valid = 0;
        }
        if (!$(policy).is(":checked")){
            valid = 0;
            $(policy).addClass("is-invalid");
        }
        if (valid == 1) {

            let Data = new FormData(form1);
            $.ajax({
                type: "POST",
                url: ajax_feedback_form, //Change
                data: Data,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
            }).done(function (data) {
                data = JSON.parse(data);
                // console.log(data);

                if (data.status == 1){
                    //вывод модалки об успешной отправке
                    $('#success_modal').modal('show');

                    $(form)[0].reset();
                    $(text).val("");
                }
            });
            return false;
    }
});


    //форма задать вопрос
    $('#question_form_send').on('click', function(){
        let valid = 1;

        let form = $("#question_form"),
            name = $(form).find('input[name=NAME]'),
            email = $(form).find('input[name=EMAIL]'),
            message = $(form).find('textarea[name=MESSAGE]'),
            token = $(form).find('input[name=TOKEN]'),
            policy = $(form).find('input[name=POLICY]');

        //получение токена google captcha
        let captcha_token = grecaptcha.getResponse();
            $(token).val(captcha_token);

        $(form).find("input").removeClass("is-invalid");
        $(form).find("textarea").removeClass("is-invalid");

        //name
        if ($(name).val() ==''){
            valid = 0;
            $(name).addClass("is-invalid");
        }
        //email
        if($(email).val() == ''){
            valid = 0;
            $(email).addClass("is-invalid");
        }
        //email valid
        if(!validateEmail($(email).val())){
            valid = 0;
            $(email).addClass("is-invalid");
        }
        //message
        if ($(message).val() ==''){
            valid = 0;
            $(message).addClass("is-invalid");
        }
        //captcha
        if ($(token).val() == ''){
            valid = 0;
        }
        if (!$(policy).is(":checked")){
            valid = 0;
            $(policy).addClass("is-invalid");
        }
        if (valid == 1) {

            $.ajax({
                type: "POST",
                url: ajax_questions_form, //Change
                data: {
                    NAME: $(name).val(),
                    EMAIL: $(email).val(),
                    MESSAGE: $(message).val(),
                    TOKEN: $(token).val(),
                }
            }).done(function (data) {
                data = JSON.parse(data);
                // console.log(data);

                if (data.status == 1){
                    //вывод модалки об успешной отправке
                    $('#success_modal').modal('show');

                    $(form)[0].reset();
                    $(message).val('');
                }
            });
            return false;
        }
    });

    //форма оценить материал
    $('.estimate_form_send').on('click', function(){
        let valid = 1;

        let form = $(this).closest(".estimate_form_modal"),
            form_modal = $(this).closest(".estimate_modal").attr('id'),
            fio = $(form).find('input[name=FIO]'),
            email = $(form).find('input[name=EMAIL]'),
            comment = $(form).find('textarea[name=COMMENT]'),
            file_id = $(form).find('input[name=FILE_ID]'),
            file_src = $(form).find('input[name=FILE_SRC]'),
            token = $(form).find('input[name=TOKEN]'),
            policy = $(form).find('input[name=POLICY]');

        //получение токена google captcha
        let captcha_token = grecaptcha.getResponse();
            $(token).val(captcha_token);

        $(form).find("input").removeClass("is-invalid");
        $(form).find("textarea").removeClass("is-invalid");

        //fio
        if ($(fio).val() ==''){
            valid = 0;
            $(fio).addClass("is-invalid");
        }
        //email
        if($(email).val() == ''){
            valid = 0;
            $(email).addClass("is-invalid");
        }
        //email valid
        if(!validateEmail($(email).val())){
            valid = 0;
            $(email).addClass("is-invalid");
        }
        //comment
        if ($(comment).val() ==''){
            valid = 0;
            $(comment).addClass("is-invalid");
        }
        //captcha
        if ($(token).val() == ''){
            valid = 0;
        }
        if (!$(policy).is(":checked")){
            valid = 0;
            $(policy).addClass("is-invalid");
        }
        if (valid == 1) {

            $.ajax({
                type: "POST",
                url: ajax_estimate_form, //Change
                data: {
                    FIO: $(fio).val(),
                    EMAIL: $(email).val(),
                    COMMENT: $(comment).val(),
                    FILE_ID: $(file_id).val(),
                    FILE_SRC: $(file_src).val(),
                    TOKEN: $(token).val(),
                }
            }).done(function (data) {
                data = JSON.parse(data);
                // console.log(data);

                if (data.status == 1){
                    //скрыть текущую модалку
                    $("#"+form_modal).modal('hide');
                    //вывод модалки об успешной отправке
                    $('#success_modal').modal('show');

                    $(fio).val('');
                    $(email).val('');
                    $(comment).val('');
                    $(policy).val('');

                    // $(form)[0].reset();
                }
            });
            return false;
        }
    });
	
	 //форма обратной связи
    $('#corruption_form_send').on('click', function(){

        let form2 = document.getElementById("corruption_form");
        let valid = 1;

        let form = $("#corruption_form"),
            theme = $(form).find('input[name=THEME]'),
            fullname = $(form).find('input[name=FULLNAME]'),
            addr = $(form).find('input[name=ADDR]'),
            email = $(form).find('input[name=EMAIL]'),
            text = $(form).find('textarea[name=TEXT]'),
            token = $(form).find('input[name=TOKEN]'),

            file = $(form).find('input[name=FILE]'),

            policy = $(form).find('input[name=POLICY]');


        //получение токена google captcha
        let captcha_token = grecaptcha.getResponse();
            $(token).val(captcha_token);

        $(form).find("input").removeClass("is-invalid");
        $(form).find("select").removeClass("is-invalid");
        $(form).find("textarea").removeClass("is-invalid");

        //theme
        if ($(theme).val() ==''){
            valid = 0;
            $(theme).addClass("is-invalid");
        }
        //fullname
        if ($(fullname).val() ==''){
            valid = 0;
            $(fullname).addClass("is-invalid");
        }
        //address
        if($(addr).val() == ''){
            valid = 0;
            $(addr).addClass("is-invalid");
        }
        //email
        if($(email).val() == ''){
            valid = 0;
            $(email).addClass("is-invalid");
        }
        // //email valid
        // if(!validateEmail($(email).val())){
        //     valid = 0;
        //     $(email).addClass("is-invalid");
        // }
        //text
        if ($(text).val() ==''){
            valid = 0;
            $(text).addClass("is-invalid");
        }
        //captcha
        if ($(token).val() == ''){
            valid = 0;
        }
        if (!$(policy).is(":checked")){
            valid = 0;
            $(policy).addClass("is-invalid");
        }
        if (valid == 1) {

            let Data = new FormData(form2);
            $.ajax({
                type: "POST",
                url: ajax_corruption_form, //Change
                data: Data,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
            }).done(function (data) {
                data = JSON.parse(data);
                // console.log(data);

                if (data.status == 1){
                    //вывод модалки об успешной отправке
                    $('#success_modal').modal('show');

                    $(form)[0].reset();
                    $(text).val("");
                }
            });
            return false;
    }
});

});