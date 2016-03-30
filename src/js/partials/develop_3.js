try {

    function addHtmlItems(name, size, type, id, renderFile) {

        var a = name.split('.');
        var typeHand = a[a.length - 1];
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


        var text = '<div class="convert-item' + ' classifire-id-' + id + '" data-file-id="' + id + '"><div class="item"><div class="close-button-item"></div><div class="convert"><div class="doc-type"><img src="' + srcType + '" alt=""></div><div class="description-file"><div class="progress-line mdl-color--primary"></div><div class="name">' + name + '</div><div class="size">' + Math.round(size / (1024 * 1024) * 100) / 100 + ' Мб' + ' </div><div class="done-button"><i class="material-icons">check</i></div></div></div><div class="checker"><div class="done row-check-some"><i class="material-icons">check_box_outline_blank</i> <span>Основная</span></div><div class="not-done row-check-some"><i class="material-icons">check_box</i><span>Основная</span></div></div > </div></div>';
        return text;
    }

    function myFunctionTrain(goGOgo) {
        var x = goGOgo.context;
        //console.log(goGOgo.context.files);

        var txt = "";
        if ('files' in x) {
            if (x.files.length == 0) {
                txt = "Select one or more files.";
                $(goGOgo).closest('form').find('.error-field').addClass('show-this-row');
                $(goGOgo).closest('form').find('.error-massage').html('Files not selected');
            } else {
                if ($('.sliding-shift').hasClass('activate-field')) {
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

        //console.log(txt);
    }


    function superUploader() {
        $("#file-load-area").dmUploader({
            onInit: function(id, file) {
                //console.log('Plugin successfully initialized');
            },
            onBeforeUpload: function(id) {
                //console.log('Starting to upload #' + id);
            },
            onUploadProgress: function(id, percent) {
                //console.log(percent);
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
                //console.log('We reach the end of the upload Queue!');
                $('body').find('#change-document').find('.convert-item').each(function() {
                    $(this).find('.progress-line').css('right', '0%');
                });
            },
            onNewFile: function(id, file) {

                if ($('.sliding-shift').hasClass('activate-field')) {
                    $('#change-document .sliding-shift').slick('unslick');
                    $('.sliding-shift').removeClass('activate-field');
                };

                $('#file-load-many').closest('form').find('.sliding-shift').prepend(addHtmlItems(file.name, file.size, file.type, id));

                if (file.type == 'image/jpeg') {

                    if (typeof FileReader !== "undefined") {

                        var reader = new FileReader();

                        // Our <img> object
                        //console.log(id);

                        var img = $('body').find('#change-document').find('.convert-item').eq(0).find('.doc-type').find('img');
                        //console.log(img);

                        reader.onload = function(e) {
                            img.attr('src', e.target.result);
                        }
                        reader.readAsDataURL(file);

                    }
                }

                saveMod[saveMod.length] = true; 
                stackFiles[stackFiles.length] = file;
                localStoragesApp[localStoragesApp.length] = file;
            }
        });
    }

    var stackFiles = [];
    var fileId = '';
    var localStoragesApp = [];
    var saveMod  = [];

    $(document).ready(function() {
        $('#save-document-change').attr('disabled', 'disabled');

        superUploader();

        $('#change-document ').on('click', '.close-button-item', function() {
            $(this).closest('.convert-item').addClass('delete-this-element');
            var currentDelete = parseInt($(this).closest('.convert-item').attr('data-file-id'));
            localStoragesApp[currentDelete].status = 'delete';
            $('#input50').val('');
            $('#target4').val('');
        });

        // delete file
        $('.close-button-item').on('click', function() {
            //console.log('click close');
           // console.log(stackFiles);
        });

        // add file
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


        // change description
        $('#input50 , #target4 ').on('change keyup', function() {
            $('#save-document-change').removeAttr('disabled');
            $('#save-document-change').prop('checked', false);

            saveMod[fileId] = false;
            
            localStoragesApp[fileId].id = fileId;
            //localStoragesApp[fileId].name = $('#input50').val();
            localStoragesApp[fileId].newName = $('#input50').val();
            localStoragesApp[fileId].description = $('#target4').val();

            //console.log(localStoragesApp[fileId].newName);

            $('.status-link').find('.save').css('display', 'none');
            $('.status-link').find('.chernovik').css('display', 'block');
            $('.status-link').find('.publick').css('display', 'none');
        });

        
        // choose item    
        $('#change-document ').on('click', '.convert-item .item>.convert', function() {

            if (!$(this).closest('.convert-item').hasClass('delete-this-element')) {
                // обнулятор статуса
                $('#save-document-change').attr('disabled', 'disabled');

                // поточный елемент
                fileId = parseInt($(this).closest('.convert-item').attr('data-file-id'));

                if (saveMod[fileId]) {
                    $('#save-document-change').attr('disabled', 'disabled');
                    $('#save-document-change').prop('checked', true);

                    $('.status-link').find('.publick').css('display', 'none');
                    $('.status-link').find('.chernovik').css('display', 'none');
                    $('.status-link').find('.save').css('display', 'block');

                } else {

                    $('#save-document-change').removeAttr('disabled');
                    $('#save-document-change').prop('checked', false);

                    $('.status-link').find('.publick').css('display', 'none');
                    $('.status-link').find('.chernovik').css('display', 'block');
                    $('.status-link').find('.save').css('display', 'none');
                };


                // input 
                $('#change-document').find('.spec-input50').click();

                $('#change-document').find('#input50').closest('.mdl-textfield').addClass('is-dirty').addClass('is-upgraded').addClass('is-focused').removeClass('is-invalid');

                if (localStoragesApp[fileId].newName) {
                    $('#change-document').find('#input50').val(localStoragesApp[fileId].newName);
                } else {
                    $('#change-document').find('#input50').val(localStoragesApp[fileId].name);
                }


                // textarea 
                if (localStoragesApp[fileId].description) {
                    $('#change-document').find('#target4').val(localStoragesApp[fileId].description);
                    $('#change-document').find('.spec-target4').click();

                    $('#change-document').find('#target4').closest('.mdl-textfield').addClass('is-dirty').addClass('is-upgraded').addClass('is-focused').removeClass('is-invalid');
                } else {
                    $('#change-document').find('#target4').closest('.mdl-textfield').removeClass('is-dirty').removeClass('is-upgraded').removeClass('is-focused');
                    $('#change-document').find('#target4').val('');
                };


                $('#change-document .convert-item .item').removeClass('active-item');
                $(this).closest('.item').addClass('active-item');
            }
        });

        // save changes
        $('#change-document').on('change', '#save-document-change', function() {
            stackFiles[fileId].id = localStoragesApp[fileId].id;
            stackFiles[fileId].name = localStoragesApp[fileId].name;
            stackFiles[fileId].description = localStoragesApp[fileId].description;
            stackFiles[fileId].newName = localStoragesApp[fileId].newName;
            stackFiles[fileId].status = localStoragesApp[fileId].status;
            stackFiles[fileId].checkedBase = localStoragesApp[fileId].checkedBase;

            saveMod[fileId] = true;

            $('.status-link').find('.save').css('display', 'block');
            $('.status-link').find('.chernovik').css('display', 'none');
            $('.status-link').find('.publick').css('display', 'none');
        });

        $('#change-document').on('click', '.checker', function() {
            $('.checker').removeClass('rewerse-checker');
            $(this).addClass('rewerse-checker');
            
            // change data
            var current = $(this).closest('.convert-item ').attr('data-file-id');
            var itemsLenght = $('.convert-item').length;

            for (var i = 0; i < itemsLenght; i++) {
                if (i == current) {
                    localStoragesApp[i].checkedBase = true;
                } else {
                    localStoragesApp[i].checkedBase = false;
                }
            };
        })
        //rewerse - checker

    });

    $(window).load(function() {

    });

    $(window).resize(function() {

    });

}
catch (e) {

    console.log('develop_3.js \n Error! ' + e.name + ':' + e.message + '\n' + e.stack);

}