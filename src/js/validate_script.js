/*валидация формы*/
function validate(form, options){
    var setings = {
        errorFunction:null,
        submitFunction:null,
        highlightFunction:null,
        unhighlightFunction:null
    }
    $.extend(setings, options);

    var $form = $(form);

    if ($form.length && $form.attr('novalidate') === undefined) {
        $form.on('submit', function(e) {
            e.preventDefault();
        });

        $form.validate({
            errorClass : 'errorText',
            focusCleanup : true,
            focusInvalid : false,
            debug: true,
            invalidHandler: function(event, validator) {
                if(typeof(setings.errorFunction) === 'function'){
                    setings.errorFunction(form);
                }
            },
            errorPlacement: function(error, element) {
                error.appendTo( element.closest('.form_input'));
            },
            highlight: function(element, errorClass, validClass) {
                $(element).addClass('error');
                $(element).closest('.form_row').addClass('error').removeClass('valid');
                if( typeof(setings.highlightFunction) === 'function' ) {
                    setings.highlightFunction(form);
                }
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('error');
                if($(element).closest('.form_row').is('.error')){
                    $(element).closest('.form_row').removeClass('error').addClass('valid');
                }
                if( typeof(setings.unhighlightFunction) === 'function' ) {
                    setings.unhighlightFunction(form);
                }
            },
            submitHandler: function(form) {
                if( typeof(setings.submitFunction) === 'function' ) {
                    setings.submitFunction(form);
                } else {
                    $form[0].submit();
                }
            }
        });

        $('[required]',$form).each(function(){
            $(this).rules( "add", {
                required: true,
                messages: {
                    required: "Вы пропустили"
                }
            });
        });

        if($('[type="email"]',$form).length) {
            $('[type="email"]',$form).rules( "add",
            {
                messages: {
                    email: "Невалидный email"
                 }
            });
        }

        if($('.tel-mask[required]',$form).length){
            $('.tel-mask[required]',$form).rules("add",
            {
                messages:{
                    required:"Введите номер мобильного телефона."
                }
            });
        }

        $('[type="password"]',$form).each(function(){
            if($(this).is("#re_password") == true){
                $(this).rules("add", {
                    minlength:3,
                    equalTo:"#password",
                    messages:{
                        equalTo:"Неверный пароль.",
                        minlength:"Недостаточно символов."
                    }
                });
            }
        })

        if($('textarea',$form).length) {
            $('textarea',$form).rules( "add",
            {
                messages:{
                    required:"Введите сообщение"
                }
            });
        }
    }
}

/*Отправка формы с вызовом попапа*/
function validationCall(form){

  var thisForm = $(form);
  var formSur = thisForm.serialize();

    $.ajax({
        url : thisForm.attr('action'),
        data: formSur,
        method:'POST',
        success : function(data){
            if ( data.trim() == 'true') {
                thisForm.trigger("reset");
                popNext("#call_success", "call-popup");
            }
            else {
               thisForm.trigger('reset');
            }

        }
    });
}

/* Отправка формы с файлом */
function validationCallDocument(form){

    var thisForm = $(form);
    var formData = new FormData($(form)[0]);

    formData.append('file', thisForm.find('input[type=file]')[0].files[0]);

    $.ajax({
        url: thisForm.attr('action'),
        type: "POST",
        data: formData,
        contentType:false,
        processData:false,
        cache:false,
        success: function(response) {
            thisForm.trigger("reset");
            popNext("#call_success", "call-popup");
        }
    });

}

/* Отправка формы с файлaми */
function validationCallDocuments(form){

    var thisForm = $(form);
    var formData = new FormData($(form)[0]);

    $.each(thisForm.find('input[type="file"]')[0].files, function(index, file){
        formData.append('file-'+index, file);
    });

    $.ajax({
        url: thisForm.attr('action'),
        type: "POST",
        data: formData,
        contentType:false,
        processData:false,
        cache:false,
        success: function(response) {
            thisForm.trigger("reset");
            popNext("#call_success", "call-popup");
        }
    });

}


function popNext(popupId, popupWrap){

    $.fancybox.open(popupId,{
        padding:0,
        fitToView:false,
        wrapCSS:popupWrap,
        autoSize:true,
        afterClose: function(){
            $('form').trigger("reset");
            clearTimeout(timer);
        }
    });

    var timer = null;

    timer = setTimeout(function(){
        $('form').trigger("reset");
        $.fancybox.close(popupId);
    },2000);

}



/*маска на инпуте*/
function Maskedinput(){
    if($('.tel-mask')){
        $('.tel-mask').mask('+9 (999) 999-99-99 ');
    }
}

/*fansybox на форме*/
function fancyboxForm(){
  $('.fancybox-form').fancybox({
    openEffect  : 'fade',
    closeEffect : 'fade',
    autoResize:true,
    wrapCSS:'fancybox-form',
    'closeBtn' : true,
    fitToView:true,
    padding:'0'
  })
}
function fancyCallback(){
  $('.fancy-callback').fancybox({
    openEffect  : 'fade',
    closeEffect : 'fade',
    autoResize:false,
    autoSize:false,
    'closeBtn' : true,
    fitToView:true,
    padding:'0',
    maxWidth:'690'
  })
}

function chat(){
    /*clone main Chat*/
    var cloneChat = null,
        namePerson = null;
    function clonedChat(){
        cloneChat = $('.cloned-chat').clone();
        cloneChat.find('textarea').val(" ");

    }



    /* click on reply */
    function clickOnreply(){
        $(document).on('click', '.reply-post', function(event) {
            event.preventDefault();

            /* remove all cloned chats*/
            $('.chat-item-wrap .cloned-chat').remove();

            clonedChat();

            namePerson = $(this).closest('.chat-item').find('>.chat-person .chat-person-name span').first().text();

            $(this).closest('.chat-item').find('>.text').after(cloneChat).next('.cloned-chat').slideDown(function(){
                $(this).find('textarea').val(namePerson+", ").focus();
            });

        });
    }
    clickOnreply();

    function mainChatSubmit(){

        $(document).on('submit', '.form-chat-main', function(event) {
        event.preventDefault();
        var form = $(this);
        var parentForm = $(this).parent();

        var personImg = $('.main-chat .chat-person-img img').attr('src');
        var personName = $('.main-chat .chat-person-name span').first().text();
        var personLastName = $('.main-chat .chat-person-name span').last().text();
        var message = parentForm.find('.chat-form textarea').val();         //MESSEGE
        var messageTag = null;
        var otherButton = "";

        if(parentForm.hasClass('main-chat')){
            namePerson = 0;
            if( message.length === 0){
                return false;
            }
            messageTag = message;
        }

        if(parentForm.hasClass('cloned-chat')){
            var clearMessage = message.replace(namePerson+", " ,"");
            messageTag = '<span>'+namePerson+', '+'</span>'+' '+clearMessage;
        }

        var messageLength = parseInt(message.length);
        var personLength = parseInt(namePerson.length) + 2;

        var date = new Date;
        var minutes = date.getMinutes();
        var hour = date.getHours();
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();

        if(parentForm.hasClass('main-chat')){
            otherButton = '<div class="block-button"><div class="drop drop-share-block"><div class="convert"><i class="material-icons">more_vert</i></div><div class="hide-hipe share-block"><ul><li><a href="#" class="reply-post"><i class="material-icons">reply</i><span>Ответить</span></a></li><li><a href="#" class="block-post"><i class="material-icons">block</i><span>Заблокировать</span></a></li></ul></div></div></div>';
        }
        var wraper = '<div class="chat-item"><div class="chat-person cfix"><div class="chat-person-img"><img src="'+personImg+'" alt=""></div><div class="chat-person-detail "><div class="chat-person-name"><span>'+personName+'</span> '+'<span>'+personLastName+'</span></div><div class="chat-person-date"><i class="fa fa-calendar"></i><span>'+day+'.'+month+'.'+year+'</span><i class="fa fa-clock-o"></i><span>'+hour+'.'+minutes+'</span><span class="reply-post"><i class="material-icons">reply</i><span>Ответить</span></span></div></div></div> <div class="text">'+messageTag+'</div>'+otherButton+'</div>';

        $.ajax({
            url: ajaxUrl,
            type: "POST",
            contentType:false,
            success: function() {
                console.log(parentForm.hasClass('cloned-chat'));
                if( parentForm.hasClass('cloned-chat') ){
                    if(messageLength <= personLength){ //mini validation
                        console.log('false submit');
                        return false;
                    }else{
                        parentForm.after(wraper);
                        $('.chat-item .cloned-chat').slideUp(function(){
                            $(this).remove();
                        })
                    }
                }else if( parentForm.hasClass('main-chat') ){
                    $('.chat-item-wrap').prepend(wraper);
                }
            }
        });
    });
    }
    mainChatSubmit();
}




$(document).ready(function(){
    chat();

    validate('#call-popup .contact-form', {submitFunction:validationCall});

    validate('.search-form');
    //validate('.main-chat:not(.cloned-chat) form',{submitFunction:mainChatSubmit});
    //validate('.cloned-chat form',{submitFunction:mainChatSubmit()});

    Maskedinput();
    fancyboxForm();
    fancyCallback();
});