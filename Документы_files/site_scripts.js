$(document).ready(function () {

    //обработка формы на странице Анкета (выбор обследования)
    if (window.location.pathname == "/zdorov/") {

        let age = document.getElementsByName("age"),
            age_val = "",
            chronic = document.getElementsByName("chronic"),
            chronic_val = "",
            last_visit = document.getElementsByName("last_visit"),
            last_visit_val = "",
            
            no_links = document.getElementById("no_links"),
            have_links = document.getElementById("have_links"),
            onko_link = document.getElementById("onko_link"),
            disp_link = document.getElementById("disp_link"),
            show_modal = document.getElementById("show_modal");

        $(show_modal).prop('disabled', true);

        function hide_links() {

            $(no_links).hide();
            $(have_links).hide();

            $(onko_link).hide();
            $(disp_link).hide();
        }

        hide_links();

        function count_variants() {
            //диспансер
            if (age_val == 1 || age_val == 2 || age_val == 3) {
                if (chronic_val == 1 || chronic_val == 2) {
                    if (last_visit_val == 1) {
                        $(no_links).hide();
                        $(have_links).show();
                        $(disp_link).show();
                    }
                }
            }

            //онкоскрининг
            if (age_val == 2 || age_val == 3) {
                if (chronic_val == 1 || chronic_val == 2) {
                    if (last_visit_val == 1 || last_visit_val == 2) {
                        $(no_links).hide();
                        $(have_links).show();
                        $(onko_link).show();
                    }
                }
            }

            if (age_val == 1) {
                if (chronic_val == 1 || chronic_val == 2) {
                    if (last_visit_val == 2) {
                        $(have_links).hide();
                        $(no_links).show();
                    }
                }
            }
        }


        $(age).on("change", function (e) {
            age_val = $('input[name=age]:checked').val();

            hide_links();
            count_variants();

        });

        $(chronic).on("change", function () {
            chronic_val = $('input[name=chronic]:checked').val();
            hide_links();
            count_variants();

        });

        $(last_visit).on("change", function () {
            last_visit_val = $('input[name=last_visit]:checked').val();
            hide_links();
            count_variants();
            $(show_modal).prop('disabled', false);
        });
    }
});

//добавление масок и ограничений на формы
jQuery(function($) {
    if (window.location.pathname == "/feedback/") {
        $('input[name*="form_text_12"]').mask("+7 (999) 999 - 99 - 99");
        $('input[name*="PHONE"]').mask("+7 (999) 999 - 99 - 99");
        $('input[name*="form_email_14"]').attr('type', "email");
    }
    if (window.location.pathname == "/ministry/about/") {
        $('input[name*="form_email_2"]').attr('type', "email");
    }
});