try {

    function addHtmlItems(name, size, type, id, renderFile) {

        var a = name.split('.'); 
        var typeHand = a[a.length-1]; 
        var srcType = '';
        switch (typeHand) {
            case 'jpg':
                srcType = 'images/typer1.jpg'
            break
        case 'pdf':
            srcType = 'images/slider-pdf.jpg'
            break
        case 'doc':
            srcType = 'images/slider-doc.jpg'
            break
        case 'docx':
            srcType = 'images/slider-doc.jpg'
            break
        case 'xls':
            srcType = 'images/slider-xls.jpg'
            break
        case 'txt':
            srcType = 'images/typer1.jpg'
            break
        default:
            srcType = 'images/typer1.jpg'
        }


       var text =  '<div class="convert-item'+ ' classifire-id-'+ id +'" data-file-id="'+id+'"><div class="item"><div class="close-button-item"></div><div class="convert"><div class="doc-type"><img src="'+ srcType +'" alt=""></div><div class="description-file"><div class="progress-line mdl-color--primary"></div><div class="name">' + name + '</div><div class="size">' + Math.round(size/(1024*1024)*100)/100 + ' Мб' + ' </div><div class="done-button"><i class="material-icons">check</i></div></div></div><div class="checker"><div class="done row-check-some"><i class="material-icons">check_box_outline_blank</i> <span>Основная</span></div><div class="not-done row-check-some"><i class="material-icons">check_box</i><span>Основная</span></div></div > </div></div>';
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
                    $(goGOgo).closest('form').find('.sliding-shift').append(addHtmlItems(betaName, betaSize));                    
                } 
            }
        }

         
        setTimeout(function() {
            $('.sliding-shift').addClass('activate-field');
            $('#change-document .sliding-shift').slick({
                dots: false,
                infinite: false,
                speed: 300,
                adaptiveHeight: true,
                variableWidth: false,
                centerMode: false
            });
        }, 500);

        console.log(txt);
    }   

    var fileStuck = '';

function superUploader() {
    $("#file-load-area").dmUploader({
        onInit: function(id, file) {
            console.log('Plugin successfully initialized');
        },
        onBeforeUpload: function(id) {
            console.log('Starting to upload #' + id);
        },
        onUploadProgress: function(id, percent) {
           console.log( percent);
            // do something cool here!
           var ffff = '.classifire-id-' + id;
            $('body').find('#change-document').find(ffff).find('.progress-line').css('right', 100 - percent + '%');
            if (percent == 100) {

                $('body').find('#change-document').find(ffff).find('.done-button').css('opacity', '1');

                $('body').find('#change-document').find(ffff).find('.close-button-item').css('display', 'block');

                $('body').find('#change-document').find(ffff).find('.item').css('opacity', '1');
                
            }
        },
        onComplete: function() {
            console.log('We reach the end of the upload Queue!');
            $('body').find('#change-document').find('.convert-item').each(function() {
                $(this).find('.progress-line').css('right', '0%');
            });
        },
        onNewFile: function(id, file) {
            
            console.log(file.type);
            console.log(file.size);
            console.log(file);
            console.log(id);

            stackFiles[stackFiles.length] = file;

            if ($('.sliding-shift').hasClass('activate-field')) {
                $('#change-document .sliding-shift').slick('unslick');
                $('.sliding-shift').removeClass('activate-field');
            };

            $('#file-load-many').closest('form').find('.sliding-shift').prepend(addHtmlItems(file.name, file.size, file.type, id));

            if (file.type == 'image/jpeg' ){

            
                if (typeof FileReader !== "undefined"){
                
                    var reader = new FileReader();

                    // Our <img> object
                    console.log(id);

                    var img = $('body').find('#change-document').find('.convert-item').eq(0).find('.doc-type').find('img');
                    console.log(img);

                    reader.onload = function (e) {
                        img.attr('src', e.target.result);
                    }
                    reader.readAsDataURL(file);

                }
            }

            
        }
    });
}
    
var stackFiles = [];
    
$(document).ready(function() {

    
    superUploader();

    $('#change-document ').on('click', '.close-button-item', function() {
        console.log('click close');
        console.log(stackFiles);
    });

    $('.close-button-item').on('click', function() {
        console.log('click close');
        console.log(stackFiles);
    });

    $('#change-document input[type=file]').on('change', function() {

        $('.slider-row').css('height', '160px');

        setTimeout(function() {
            $('.sliding-shift').addClass('activate-field');
            $('#change-document .sliding-shift').slick({
                dots: false,
                infinite: false,
                speed: 300,
                slidesToShow: 5,
                adaptiveHeight: true,
                variableWidth: false
            });
        }, 500);


    });

    $('#change-document ').on('click', '.convert-item .item>.convert', function() {
        console.log('click');
        $('#change-document .convert-item .item').removeClass('active-item');
        $(this).closest('.item').addClass('active-item');
    });
        
    });

    $(window).load(function(){

    });

    $(window).resize(function(){

    });

}
catch(e){

    console.log('develop_3.js \n Error! '+e.name+':'+e.message+'\n'+e.stack);

}