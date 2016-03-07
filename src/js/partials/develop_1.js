try{

    function headerSendwich(){

        $(document).on('click', '.header-sedwich', function(){

            if($(this).is('.active')){
                $(this).removeClass('active');
                $('.main-menu nav').stop().slideUp(300);
            }else{
                $(this).addClass('active');
                $('.main-menu nav').stop().slideDown(300);
            }

        });

        $(window).resize(function(){

            if($(window).width()>992){
                $('.main-menu nav').removeAttr('style');
            }

        });

    }

    $(document).ready(function(){

        headerSendwich();

    });

    $(window).load(function(){

    });

    $(window).resize(function(){

    });

}
catch(e){

    console.log('develop_1.js \n Error! '+e.name+':'+e.message+'\n'+e.stack);

}