try{

    //sendwich for header

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
                    $('.header-sedwich').removeClass('active');
                }

            });

        };

    // /sendwich for header

        function errorPageMinHeight(){

            if($('.error-page').length){

                function whatHeight(){

                    var windowHeight = $(window).height();
                    var headerHeight = $('.header').height();
                    var footerHeight = $('.footer').height();
                    var mainTopHeight = $('.main .main-top').height();

                    var errorPageHeight = windowHeight - headerHeight - footerHeight - mainTopHeight;

                    $('.error-page .container').css({'min-height':errorPageHeight+'px'});
                };

                whatHeight();

                $(window).load(function(){

                    whatHeight();

                });

                $(window).resize(function(){

                    whatHeight();

                });

            }

        };

    // draw svg statistic

        function drawSvgStatistic(){

            var circleDeg = 0;
            var svgItem = Snap('.svg svg');

            $('.info-row').each(function(index, el) {

                var lineColor = $(this).find('.info-color span').data('color');

                $(this).find('.info-color span').css('background-color', lineColor);

                var percValue = $(this).find('.info-value').data('value');
                var circleRadius = 142*Math.PI;
                var lineRadius = ((percValue * circleRadius)/100)+1;
                var circleWidth = lineRadius+' '+circleRadius;

                var circle = svgItem.circle(105, 105, 71);

                circle.attr({
                    fill:"none",
                    stroke:lineColor,
                    strokeWidth:34,
                    "stroke-dasharray":circleWidth,
                    'data-value':percValue
                });

                $('.svg circle').eq(index).css({'transform':'rotate('+circleDeg+'deg)'});

                circleDeg = circleDeg + ((lineRadius-1)*360)/circleRadius;

            });

            var itemText = svgItem.text(0, 0, '');
            itemText.attr({
                "text-anchor":"middle",
                'x':'52%',
                'y':'54%'
            });

            $('.svg svg circle').hover(
                function(){
                    var textVal = $(this).data('value');
                    $(this).css({'stroke-width':'40'});
                    $('.svg text').html(textVal+'%');
                },
                function(){
                    $(this).css({'stroke-width':'34'});
                    $('.svg text').html('');
                }
            );

        }

    // /draw svg statistic

    // fancybox slider

        function fancyboxSlider(){

            $('.fancybox-slider').fancybox({
                fitToView:true,
                autoSize:true,
                padding:0,
                wrapCSS:'fancybox-slider-wrap',
                afterShow:function(){
                    $('.slider-body-main').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
                            var i = (currentSlide ? currentSlide : 0) + 1;
                            console.log($('.slider-body-main .slick-current').data('name'));
                            $('.slider-num').text(i + '/' + slick.slideCount);
                            $('.slider-name-wrap').text($('.slider-body-main .slick-current').data('name')+'.'+$('.slider-body-main .slick-current').data('type'));
                        });

                    $('.slider-body-main').slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite:false,
                        asNavFor:'.slider-bottom'
                    });

                    $('.slider-bottom').slick({
                        slidesToShow:10,
                        slidesToScroll:1,
                        infinite:false,
                        asNavFor:'.slider-bottom'
                    });
                }
            });



        }

    // /fancybox slider


    $(document).ready(function(){

        headerSendwich();
        errorPageMinHeight();
        drawSvgStatistic();
        fancyboxSlider();

    });

    $(window).load(function(){

    });

    $(window).resize(function(){

    });

}
catch(e){

    console.log('develop_1.js \n Error! '+e.name+':'+e.message+'\n'+e.stack);

}