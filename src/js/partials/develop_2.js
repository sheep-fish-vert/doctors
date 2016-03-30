try{
    function clickanderMulti(){
        var redFlag = true;

        $(document).on('click touchstart', function(event) {
            if (!$('.fancybox-overlay').is(event.target) && ($('.fancybox-overlay').has(event.target).length === 0 ) ) {
            
                var smart1 = $('.drop-soc-block');
                var smart2 = $('.drop-share-block');
                
                var animDelay = 500;
                var thisOne;

                if ($('.drop').is(event.target)) {
                    thisOne =$(event.target) ;
                }

                if ($('.drop .convert').is(event.target) || $('.drop i').is(event.target) ) {
                    thisOne = $(event.target).closest('.drop');
                }          
                

                if ((redFlag === true)  ) {

                    redFlag = false;             
                    
                    
                    if (!smart1.is(event.target) && (smart1.has(event.target).length === 0 ) )
                        {
                            smart1.removeClass('active-drop');
                            smart1.children('.hide-hipe').hide(animDelay);
                        }
                    else{

                        if ($(thisOne).hasClass('active-drop')){ 
                                smart1.removeClass('active-drop');                      
                                smart1.children('.hide-hipe').hide(animDelay);
                            }  
                        else{
                            smart1.removeClass('active-drop'); 
                            smart1.children('.hide-hipe').hide(animDelay);
                            $(thisOne).addClass('active-drop');
                            $(thisOne).children('.hide-hipe').show(animDelay);
                        };

                    };

                    if (!smart2.is(event.target) && (smart2.has(event.target).length === 0 ))
                        {
                            smart2.removeClass('active-drop');
                            smart2.children('.hide-hipe').hide(animDelay);
                        }

                    else{
                        if ( $(thisOne).hasClass('active-drop')){ 
                                smart2.removeClass('active-drop');                      
                                smart2.children('.hide-hipe').hide(animDelay);
                            }  
                        else{
                            smart2.removeClass('active-drop'); 
                            smart2.children('.hide-hipe').hide(animDelay);
                            $(thisOne).addClass('active-drop');
                            $(thisOne).children('.hide-hipe').show(animDelay);
                        };
                        

                    };
                    setTimeout(function() { redFlag = true;}, animDelay);
                }
                
                // обработка кликов на пункты меню
                
                var thisTwo;
                
                if ($('.single').is(event.target)) {
                    thisTwo =$(event.target) ;
                }
                
                if ($(event.target).closest('.single').length) {
                    thisTwo = $(event.target).closest('.single'); 
                    
                }
                
                var animDelay2 = 1000;
                var greenFlag = true;
                
                
                if ($('.spec-c').is(event.target) || $('.open-more').is(event.target) ) {
                    $(event.target).closest('.dstranger-list').addClass('openAll');
                } 
                
                if ( (!$('.single').is(event.target)) && (!$(event.target).closest('.single').length) ) {
                    $('.dstranger-list').removeClass('openAll');
                } 
                        
                // $('.dstranger-list').removeClass('openAll');
                
                if (greenFlag && (!$('.drop .convert').is(event.target)) && (!$('.drop i').is(event.target))){
                    
                    greenFlag = false ;
                    
                    $('.doctor-row').removeClass('chief-row');
                    $('.dstranger-list').find('.doctor-row').removeClass('chief-row');

                    $('.single').removeClass('activate');
                    
                    $('.single').find('vsplivander').hide('slow');
                    
                    $(thisTwo).find('vsplivander').show('slow');
                    
                    $(thisTwo).addClass('activate');
                    $(thisTwo).find('.doctor-row').addClass('chief-row');


                    setTimeout(function() { greenFlag = true;}, animDelay2);
                }
            
            }
            
            
        });
    }

     

    $(document).ready(function(){
        clickanderMulti();

        $('.fancybox-close-btn').click(function() {
            $.fancybox.close();
        });
        
        
        $(".single").each(function() {
            var counter =  $(this).find('.dstranger-list>ul>li').length;
            $(this).find('.name-item>.convert>h4>span').html('('+ counter + ')');
            $(this).find('.spec-c>.open-more').html(counter);
        });
        
        $(".tab-title").each(function(index) {
            var fff = index ;
            var counter =  $('.tabs-conteiner').eq(fff).find('.item').length;
            $(this).find('span').html('('+ counter + ')');
        });  
        
        $('.close-fancybox-please').click(function(){
            $.fancybox.close();
        });

        setTimeout(function() {
            $('.pop-choose').styler();
        }, 100);

        

        $('#add-new-document input[type="file"]').on('change', function() {
           var file = $(this)[0].files[0].name;
           $('.save-planet>p>span').text(file);
           $('.save-planet').addClass('valid');
        });

        

        $(".tromb").focusin(function() {
            $(this).closest('.rover').find('.mdl-textfield').addClass('is-focused');
        });

        $(".tromb").focusout(function() {

            if (($('#selectQ').val() == null)) {
                    $(this).closest('.rover').find('.mdl-textfield').removeClass('is-focused');
            }

        });
        /* submit check */        
        $('button[type="submit"]').attr('disabled', 'disabled');
        $('.search-submit button[type="submit"]').removeAttr('disabled');


        $('#zapros input, #zapros textarea').on('keyup', function() {
            if (($(this).closest('form').find('textarea').val() != '') && ($(this).closest('form').find('input[type=text]').val() != '') && ($(this).closest('form').find('input[type=email]').val() != '')) {
                $(this).closest('form').find('button[type="submit"]').addClass('active-submit');
                $(this).closest('form').find('button[type="submit"]').removeAttr('disabled');
            }
            else {
                $('button[type="submit"]').attr('disabled', 'disabled');
                $(this).closest('form').find('button[type="submit"]').removeClass('active-submit');
            }
        });

        $('#predlog textarea, #predlog-zalog textarea').on('keyup', function() {
            if (($(this).closest('form').find('textarea').val() != '')) {
                $(this).closest('form').find('button[type="submit"]').addClass('active-submit');
                $(this).closest('form').find('button[type="submit"]').removeAttr('disabled');
            }
            else {
                $('button[type="submit"]').attr('disabled', 'disabled');
                $(this).closest('form').find('button[type="submit"]').removeClass('active-submit');
            }
        });

        $('#obratka input').on('keyup', function() {
            if (($(this).closest('form').find('input[type=email]').val() != '') && ($(this).closest('form').find('input[name=telephone]').val() != '') && ($(this).closest('form').find('input[name=name_fio]').val() != '') ) {
                $(this).closest('form').find('button[type="submit"]').addClass('active-submit');
                $(this).closest('form').find('button[type="submit"]').removeAttr('disabled');
            }
            else {
                $('button[type="submit"]').attr('disabled', 'disabled');
                $(this).closest('form').find('button[type="submit"]').removeClass('active-submit');
            }
        });
        /* /submit check */ 
        

   

    });

    $(window).load(function(){

    });

    $(window).resize(function(){
    });

}
catch(e){

    console.log('develop_2.js \n Error! '+e.name+':'+e.message+'\n'+e.stack);

}