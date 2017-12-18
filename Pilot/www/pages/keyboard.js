/**
 * Created by bgager on 1/5/17.
 */

myApp.onPageInit('keyboard', function (page) {


// *** Hidden input example ***
// click on a link - add focus to hidden input
    $('.hiddenInput').click(function(){
        $('#hidden').data('keyboard').reveal();
        return false;
    });
// Initialize keyboard script on hidden input
// set "position.of" to the same link as above
    $('#hidden')
        .keyboard({
            layout   : 'qwerty',
            position : {
                of : $('.hiddenInput'),
                my : 'center top',
                at : 'center top'
            }
        })


});

myApp.onPageBeforeRemove('keyboard', function (page) {

    $$('#tb_keyboard').removeClass('disabled');

});

myApp.onPageBeforeAnimation('keyboard', function (page) {

    $$('#tb_keyboard').addClass('disabled');

});



var keyboardPage = {





    //******************************************************************************************************************
    //******************************************************************************************************************

};

