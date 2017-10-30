require.config({
    deps: [
        'jquery'
    ],
    callback: function ($) {
        var form = $('form.subscribe');

        form.submit(function(e) {
            if(form.validation('isValid')){
                var email = $("#newsletter").val();
                var url = form.attr('action');
                var loadingMessage = $('#loading-message');

                if(loadingMessage.length == 0) {
                    form.find('.control').append('<div id="loading-message" style="display:none;padding-top:10px;">&nbsp;</div>');
                    var loadingMessage = $('#loading-message');
                }

                e.preventDefault();
                try{
                    loadingMessage.html('Submitting...').show();
                    $.ajax({
                        url: url,
                        dataType: 'json',
                        type: 'POST',
                        data: {email: email},
                        success: function (data){
                            if(data.status != "ERROR"){
                                $('#newsletter').val('');
                            }
                            loadingMessage.html(data.msg);
                        },
                        complete: function(){
                            setTimeout(function(){
                                loadingMessage.hide();
                            },5000);
                        }
                    });
                } catch (e){
                    loadingMessage.html(e.message);
                }
            }
            return false;
        });
    }
})