try{

    function scrollTopButton(){

        function showHideScrollButton(){

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

    function plusButtonHover(){

        $(document).on('mouseenter', '.button-plus', function(){

            $(this).addClass('active');

            var item = $(this).find('.button-plus-list');

            item.stop().slideDown(300, function(){
                item.addClass('active');
            });

        });
        $(document).on('mouseleave', '.button-plus', function(){

            $(this).removeClass('active');

            var item = $(this).find('.button-plus-list');

            item.removeClass('active')

            item.stop().slideUp(300);

        });

    };

    function plusButtonClick(){

        $(document).on('click', '.button-plus.active .button-plus-img', function(e){

            if($('.button-plus-list').is('.active')){

                $.fancybox.open('#add-material', {
                    openEffect  : 'fade',
                    closeEffect : 'fade',
                    autoResize:true,
                    wrapCSS:'fancybox-form-wrap',
                    'closeBtn' : true,
                    fitToView:true,
                    padding:'0',
                    afterShow:function(){
                        $('.modal-title').addClass('active');
                    },
                    afterClose:function(){
                        $('.modal-title').removeClass('active');
                    }
                });
            }



        });

    };


    $(document).ready(function(){
            scrollTopButton();
            plusButtonHover();
            plusButtonClick();
    });

    $(window).load(function(){

    });

    $(window).resize(function(){

    });

}
catch(e){

    console.log('develop_5.js \n Error! '+e.name+':'+e.message+'\n'+e.stack);

}