
; /* Start:"a:4:{s:4:"full";s:114:"/local/templates/mzur/components/bitrix/system.pagenavigation/show_more_main_bottom_block/script.js?16989077701236";s:6:"source";s:99:"/local/templates/mzur/components/bitrix/system.pagenavigation/show_more_main_bottom_block/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
$(document).ready(function(){

    $(document).on('click', '.load-link', function(){
        var buttonContainer = $('.bottom_main_block_container');
        var targetContainer = $('.bottom_main_block'), //  Контейнер, в котором хранятся элементы
            url =  $('.load-link').attr('data-url'); //  URL, из которого будем брать элементы

        if (url !== undefined) {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'html',
                success: function(data){
                    $('.pagination-wrap').remove(); //  Удаляем старую навигацию
                    var elements = $(data).find('.bottom_main_item'), //  Ищем элементы
                        pagination = $(data).find('.pagination-wrap'); //  Ищем навигацию
                    targetContainer.append(elements); //  Добавляем посты в конец контейнера
                    buttonContainer.append(pagination); //  добавляем навигацию следом

                }
            })
        }

    });

});
/* End */
;; /* /local/templates/mzur/components/bitrix/system.pagenavigation/show_more_main_bottom_block/script.js?16989077701236*/
