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
                    $('.info-row').removeClass('hover');
                    $('.info-value[data-value='+textVal+']').parents('.info-row').addClass('hover');
                },
                function(){
                    $(this).css({'stroke-width':'34'});
                    $('.svg text').html('');
                    $('.info-row').removeClass('hover');
                }
            );

            $('.info-row').hover(
                function(){
                    var textVal = $(this).find('.info-value').data('value');
                    $('.svg [data-value='+textVal+']').css({'stroke-width':'40'});
                    $('.svg text').html(textVal+'%');
                    $('.info-row').removeClass('hover');
                    $(this).addClass('hover');
                },
                function(){
                    $('.svg circle').css({'stroke-width':'34'});
                    $('.svg text').html('');
                    $('.info-row').removeClass('hover');
                }
            );

        }

    // /draw svg statistic

    // fancybox slider

        function fancyboxSlider(){

            var group = null;
            var numImg = null;
            var timer = null;

            //function for adding place for slider descript

            function placeForSliderDescript(){

                if($('.slider-body-main .slider-item').length){

                    $('.slider-body-main .slider-item').each(function(index, el) {

                        var descriptHeight = $(this).find('.slider-descript').outerHeight();
                        var sliderItemHeight = $(this).height();
                        var imgWrapHeight = sliderItemHeight - descriptHeight;
                        var imgWrapHeightPerc = (imgWrapHeight*100)/sliderItemHeight;
                        $(this).find('.slider-img').css({'height':imgWrapHeightPerc+'%'});

                    });

                }

            }

            // whatch slide zoom

            function moveImgWhenItZoom(){

                var point = 0;
                var pointCoordX = 0;
                var pointCoordY = 0;

                $(document).on('mousedown', '.slider-item.like-zoom img', function(e) {
                   point = 1;
                   pointCoordX = e.pageX;
                   pointCoordY = e.pageY;
                   imgX = parseInt($(this).css('left'));
                   imgY = parseInt($(this).css('top'));

                });
                $(document).on('mouseup', function(){
                    point = 0;
                });

                $(document).on('mousemove', '.slider-item.like-zoom img', function(e) {

                    if(point == 1){
                        var currentCoordX = e.pageX;
                        var currentCoordY = e.pageY;
                        var imgPosX = imgX + (currentCoordX - pointCoordX);
                        var imgPosY = imgY + (currentCoordY - pointCoordY);

                        $(this).css({'left':imgPosX+'px','top':imgPosY+'px'});
                    }

                });

            };

            moveImgWhenItZoom();

            // load images from object when clicking on link (fancybox-slider)

            $(document).on('click','.fancybox-slider', function(e){

                e.preventDefault();

                group = $(this).data('group');
                numImg = $(this).data('imgnum');

                imagesGroups[group].forEach(function(item, i){

                    $('.slider-body-main, .slider-bottom').append('<div class="slider-item" data-type="'+item.type+'" data-name='+item.name+'><div class="slider-img vfix-before"><img src="'+item.src+'" alt="" /></div></div>');
                    if(item.descript != undefined){
                        $('.slider-body-main .slider-item').eq(i).append('<div class="slider-descript">'+item.descript+'</div>');
                    }

                });


            });

            $(window).resize(function(){

                placeForSliderDescript();

            });

            //loading fancybox with images

            $('.fancybox-slider').fancybox({
                fitToView:true,
                autoSize:true,
                padding:0,
                wrapCSS:'fancybox-slider-wrap',
                afterShow:function(){

                    // func when slide changes

                    $('.slider-body-main').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
                        var i = (currentSlide ? currentSlide : 0) + 1;
                        $('.slider-bottom .slider-item').eq(i-1).click();
                        $('.slider-num').text(i + ' из ' + slick.slideCount);
                        $('.slider-name-wrap').text($('.slider-body-main .slick-current').data('name')+'.'+$('.slider-body-main .slick-current').data('type'));
                        $('.slider-right a').removeClass('active');
                        $('.slider-item').removeClass('like-zoom');
                        $('.slider-item img').removeAttr('style');

                    });

                    // prety show when slider-body-main init

                    $('.slider-body-main').on('init', function(){
                        timer = setTimeout(function(){
                            $('.slider-body-main').addClass('no-opacity');
                        },500);
                    });

                    // calling init to sliders

                    $('.slider-body-main').slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite:false,
                        asNavFor:'.slider-bottom',
                        focusOnSelect:true,
                        draggable:false,
                        swipe:false
                    });

                    $('.slider-bottom').slick({
                        slidesToShow:10,
                        slidesToScroll:1,
                        infinite:false,
                        asNavFor:'.slider-body-main',
                        focusOnSelect:true,
                        draggable:false,
                        swipe:false,
                        responsive: [
                           {
                                breakpoint: 992,
                                settings: {
                                    slidesToShow:5
                                }

                            },
                            {
                                breakpoint: 666,
                                settings: {
                                    slidesToShow:3
                                }
                            }
                        ]
                    });

                    // scrolling to current slide

                    placeForSliderDescript();

                    $('.slider-body-main .slider-item').eq(numImg).click();

                },
                afterClose:function(){

                    // after fancuybox close events

                    $('.slider-body-main, .slider-bottom').slick('unslick');
                    $('.slider-body-main').removeClass('no-opacity');
                    $('.modals-slider .slider-item').remove();
                    clearTimeout(timer);
                }
            });

            // show hide support images gallery

            $(document).on('click', function(e){

                if($(e.target).is('.toggle-small-slider') || $(e.target).parent().is('.toggle-small-slider') || $(e.target).is('.slider-bottom') || $(e.target).parents('.slider-bottom').length || $(e.target).is('.slick-arrow')){

                    if(($(e.target).is('.toggle-small-slider') || $(e.target).parent().is('.toggle-small-slider')) && !$('.slider-bottom').is('.active')){

                        $('.slider-bottom').addClass('active');
                        $('.slider-body').addClass('active');
                    }
                    else if(($(e.target).is('.toggle-small-slider') || $(e.target).parent().is('.toggle-small-slider')) && $('.slider-bottom').is('.active')){

                        $('.slider-bottom').removeClass('active');
                        $('.slider-body').removeClass('active');
                    }

                }else{
                    $('.slider-bottom').removeClass('active');
                    $('.slider-body').removeClass('active');
                }
            });

            // print image by clicking print image icon

            $(document).on('click', '.print-img', function(e){

                e.preventDefault();

                window.print();

            });

            // download slide image

            $(document).on('click', '.download-img', function(){

                var imgSrc = $('.slider-body-main .slick-current img').attr('src');
                $(this).attr('href', imgSrc);

            });

            // zoom img

            $(document).on('click', '.slider-right a', function(e){

                e.preventDefault();
                if(!$(this).is('.active')){
                    $(this).addClass('active');
                    $('.slick-current').addClass('like-zoom');
                }else{
                    $(this).removeClass('active');
                    $('.slick-current').removeClass('like-zoom');
                    $('.slick-current img').removeAttr('style');
                }

            });

        }

    // /fancybox slider

    // title load line

        function titleLoadLine(){

            if($('.title-page').length){
                $('.title-page').addClass('active');
            }

        }

    // /title load line

    // tags links click

        function tagsLinksClick(){

            $('.tags-links a').on('click', function(e){

                e.preventDefault();

                var tagText = $(this).text();
                console.log(tagText);

                $('.search-form input').val(tagText);
                $('.search-form').submit();

            });

        }

    // /tags links click


    $(document).ready(function(){

        headerSendwich();
        errorPageMinHeight();
        drawSvgStatistic();
        fancyboxSlider();
        tagsLinksClick();

    });

    $(window).load(function(){

        titleLoadLine();

    });

    $(window).resize(function(){

    });

}
catch(e){

    console.log('develop_1.js \n Error! '+e.name+':'+e.message+'\n'+e.stack);

}