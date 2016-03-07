try{
     function scrollTopButton(){

        function showHideScrollButton(){

            console.log($(window).scrollTop()+', '+$(window).height()/2);

            if($(window).scrollTop() > ($(window).height()/2)){

                $('.button-up').addClass('show');

            }
            else{

                $('.button-up').removeClass('show');

            }

        }

        $(document).on('click', '.button-up.show', function(){

            $(scroller).animate({scrollTop:0},800);

        });


        showHideScrollButton();

        $(window).scroll(function(){

            showHideScrollButton();

        });

        $(window).resize(function(){

            showHideScrollButton();

        });

    }
    $(document).ready(function(){
            scrollTopButton();
    });

    $(window).load(function(){

    });

    $(window).resize(function(){

    });

}
catch(e){

    console.log('develop_5.js \n Error! '+e.name+':'+e.message+'\n'+e.stack);

}