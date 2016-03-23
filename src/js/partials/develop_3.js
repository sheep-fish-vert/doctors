try {

    function addHtmlItems(name, size) {
       var text =  '<div class="convert-item"><div class="item"><div class="close-button-item"></div><div class="convert"><div class="doc-type"><img src="images/typer1.jpg" alt=""></div><div class="description-file"><div class="name">' + name + '</div><div class="size">' + Math.round(size/(1024*1024)*100)/100 + ' Мб' + ' </div><div class="done-button"><i class="material-icons">check</i></div></div></div><div class="checker"><div class="done row-check-some"><i class="material-icons">check_box_outline_blank</i><span>Основная</span></div><div class="not-done row-check-some"><i class="material-icons">check_box</i><span>Основная</span>        </div></div > <div class="progress-line"></div></div></div>';
       return text;
    }

    function myFunctionTrain(goGOgo){
        var x = goGOgo.context;
        console.log(goGOgo.context.files);

        var txt = "";
        if ('files' in x) {
            if (x.files.length == 0) {
                txt = "Select one or more files.";
                $(goGOgo).closest('form').find('.error-field').addClass('show-this-row');
                $(goGOgo).closest('form').find('.error-massage').html('Files not selected');
            } else {
                if ($('.sliding-shift').hasClass('activate-field')){
                    $('#change-document .sliding-shift').slick('unslick');
                    $('.sliding-shift').removeClass('activate-field');
                }               
                

                for (var i = 0; i < x.files.length; i++) {
                    var betaName = '';
                    var betaSize = '';

                    var file = x.files[i];
                    if ('name' in file) {
                        betaName = file.name;
                    }
                    if ('size' in file) {
                        betaSize = file.size;
                    }
                    $(goGOgo).closest('form').find('.sliding-shift').prepend(addHtmlItems(betaName, betaSize));                    
                } 
            }
        }

         
        setTimeout(function() {
            $('.sliding-shift').addClass('activate-field');
            $('#change-document .sliding-shift').slick({
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 3,
                adaptiveHeight: true,
                variableWidth: false,
                centerMode: false
            });
        }, 500);

        console.log(txt);
    }   

    var fileStuck = ''; 

    $(document).ready(function() {
        $('#change-document input[type=file]').on('change', function() {
            myFunctionTrain($(this));
        });
                
        $('#change-document ').on('click', '.convert-item .item' , function() {
            console.log('click');
            $('#change-document .convert-item .item').removeClass('active-item');
            $(this).addClass('active-item');
        });

/*        
        $('#change-document .sliding-shift').slick({
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            adaptiveHeight: true,
            variableWidth: false,
            centerMode: false,
            focusOnSelect: true
        });
*/

    });

    $(window).load(function(){

    });

    $(window).resize(function(){

    });

}
catch(e){

    console.log('develop_3.js \n Error! '+e.name+':'+e.message+'\n'+e.stack);

}