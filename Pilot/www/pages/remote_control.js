/**
 * Created by bgager on 1/5/17.
 */

myApp.onPageInit('remoteControl', function (page) {


});

myApp.onPageBeforeRemove('remoteControl', function (page) {

    $$('#tb_remote').removeClass('disabled');

});

myApp.onPageBeforeAnimation('remoteControl', function (page) {

    $$('#tb_remote').addClass('disabled');

});



var remoteControlPage = {





    //******************************************************************************************************************
    //******************************************************************************************************************

};

