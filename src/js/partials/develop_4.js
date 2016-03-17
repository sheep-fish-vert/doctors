try{
    function stattCommentButtontoggle(){
        $(document).on('click', '.list-chat-comment', function(event) {
            event.preventDefault();
            $(this).parent().find('.comments-wrap').slideToggle(400);
        });
    }


    $(document).ready(function(){
        stattCommentButtontoggle();
    });

    $(window).load(function(){

    });

    $(window).resize(function(){

    });

}
catch(e){

    console.log('develop_4.js \n Error! '+e.name+':'+e.message+'\n'+e.stack);

}