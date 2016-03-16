try{

    function scrollTopButton(){

        function showHideScrollButton(){

            if($(window).scrollTop() > ($(window).height()/2)){

                $('.button-up, .button-plus').addClass('show');

            }
            else{

                $('.button-up, .button-plus').removeClass('show');

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

    function plusButtonHover(){

        $(document).on('mouseenter', '.button-plus.show', function(){

            var item = $(this).find('.button-plus-list');

            item.stop().slideDown(300, function(){
                item.addClass('active');
            });

        });
        $(document).on('mouseleave', '.button-plus', function(){

            var item = $(this).find('.button-plus-list');

            item.removeClass('active')

            item.stop().slideUp(300);

        });

    }


    $(document).ready(function(){
            scrollTopButton();
            plusButtonHover();
    });

    $(window).load(function(){

    });

    $(window).resize(function(){

    });

}
catch(e){

    console.log('develop_5.js \n Error! '+e.name+':'+e.message+'\n'+e.stack);

}