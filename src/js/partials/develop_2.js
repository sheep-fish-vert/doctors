try{

    $(document).ready(function(){
        var redFlag = true;

        $(document).on('click touchstart',function (event){
            var smart1 = $('.drop-soc-block');
            var smart2 = $('.drop-share-block');
            var animDelay = 300;
            if (redFlag === true) {

                redFlag = false;
                if (!smart1.is(event.target) && (smart1.has(event.target).length === 0 ))
                    {
                        smart1.removeClass('active-drop');
                        smart1.children('.hide-hipe').hide(animDelay);
                    }
                else{

                    if (smart1.hasClass('active-drop')) {
                        smart1.removeClass('active-drop');
                        smart1.children('.hide-hipe').hide(animDelay);
                    }
                    else{
                        smart1.addClass('active-drop');
                        smart1.children('.hide-hipe').show(animDelay);
                    }

                };

                if (!smart2.is(event.target) && (smart2.has(event.target).length === 0 ))
                    {
                        smart2.removeClass('active-drop');
                        smart2.children('.hide-hipe').hide(animDelay);
                    }

                else{

                    if (smart2.hasClass('active-drop')) {
                        smart2.removeClass('active-drop');
                        smart2.children('.hide-hipe').hide(animDelay);
                    }

                    else{
                        smart2.addClass('active-drop');
                        smart2.children('.hide-hipe').show(animDelay);
                    }

                };

                setTimeout(function() { redFlag = true;}, animDelay);


            }
/*
            else
            {
                if ($(this).hasClass('active-drop')) {
                    $(this).removeClass('active-drop');
                }
                else{
                    $(this).addClass('active-drop');
                }
            }
*/
        });

    });

    $(window).load(function(){

    });

    $(window).resize(function(){

    });

}
catch(e){

    console.log('develop_2.js \n Error! '+e.name+':'+e.message+'\n'+e.stack);

}