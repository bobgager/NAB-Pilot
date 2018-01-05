// Initialize app
var myApp = new Framework7();

//see if we're running in the browser
if(myApp.device.os){
    globals.isBrowser = false;
}

/*// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});*/

setSkin();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

myApp.hideToolbar($$('#gatewayToolbar'));

//get any saved custom gateway information
var customGatewayInfo = myApp.formGetData('customGatewayForm');
if (customGatewayInfo){
    globals.customTestGateway.baseURL= customGatewayInfo.customGatewayBaseURL;
    globals.customTestGateway.url= customGatewayInfo.customGatewayURL;
    globals.customTestGateway.player= customGatewayInfo.customGatewayPlayerType;
    globals.customTestGateway.ipAddress= customGatewayInfo.customGatewayIpAddress;
    globals.customTestGateway.isPC= customGatewayInfo.customGatewayIsPC;
    globals.customTestGateway.isFourK= customGatewayInfo.customGatewayIsFourK;
    globals.customTestGateway.wsURL= customGatewayInfo.customGatewayWsURL;
    globals.customTestGateway.deviceID= customGatewayInfo.customGatewayDeviceID;
    globals.customTestGateway.portNum= customGatewayInfo.customGatewayPortNum;
}



globals.selectedGateway = myApp.formGetData('selectedGateway');

setTimeout(function(){

    //check to see if a Gateway has previously been selected
    /*    if (globals.selectedGateway){
            mainView.router.load({url: 'pages/player.html', animatePages: false});

        }
        else {
            //a gateway has never been selected, or was previously cleared.
            mainView.router.load({url: 'pages/gateway.html', animatePages: false});

        }*/

    //hide the initializing div
    $$('#initializingCard').hide();


}, 1000);


//**********************************************************************************************************************
//global stuff
//**********************************************************************************************************************

    //initialize AWS
    awsConnector.initializeAWS(null);

    //watch for keyboard and remote button clicks
    $$(document).on('click', '.keyboard-button', keyboardClick);
    $$(document).on('click', '.remote-button', remoteClick);

    function keyboardClick(event){

        //get the data-value attribute
        var value = $(event.target).closest('button').data('value');

        //get the focus off the tapped key
        $('.ui-keyboard-button').blur();

        //visually show a click
        $(event.target).closest('button').addClass('ui-keyboard-clicked');
        setTimeout(function () {
            $(event.target).closest('button').removeClass('ui-keyboard-clicked');
        }, 200);

        //if it's the Shift key, switch keyboards
        if (value === 'Shift'){
            $('.ui-keyboard-keyset-normal').toggle();
            $('.ui-keyboard-keyset-shift').toggle();

        }

        //if it's the Close key, close the keyboard popup
        if (value === 'Close'){
            $('.ui-keyboard-keyset-normal').show();
            $('.ui-keyboard-keyset-shift').hide();
            myApp.closeModal()
            return;
        }

        gatewayConnector.sendKeystroke(value, "keyboard");
    }
function remoteClick(event){

    //get the data-value attribute
    var value = $(event.target).closest('button').data('value');

    //get the focus off the tapped key
    $('.ui-keyboard-button').blur();

    //visually show a click
    $(event.target).closest('button').addClass('ui-keyboard-clicked');
    setTimeout(function () {
        $(event.target).closest('button').removeClass('ui-keyboard-clicked');
    }, 200);

    //if it's the Close key, close the keyboard popup
    if (value === 'Close'){
        myApp.closeModal()
        return;
    }

    gatewayConnector.sendKeystroke(value, "remote");
}

    function resetToolbar() {
        //$$('#tb_keyboard').removeClass('disabled');
        $$('#tb_player').removeClass('disabled');
        $$('#tb_remote').removeClass('disabled');
    }

    function setSkin() {
        //add in the CSS
        if(globals.skinStyle === 'pilot'){
            Dom7('body').addClass('theme-white');
            Dom7('body').addClass('layout-dark');
        }
        else{
            //this is where we'll put the OzNet Skin if Daniel delivers one
            Dom7('body').removeClass('theme-white');
            Dom7('body').removeClass('layout-dark');
        }
    }

//**********************************************************************************************************************
// Index page functions
//**********************************************************************************************************************

    myApp.onPageInit('index', function (page) {


    });

    myApp.onPageBeforeRemove('index', function (page) {

    });

    myApp.onPageBeforeAnimation('index', function (page) {

        $$('#initializingCard').hide();

    });

    myApp.onPageAfterAnimation('index', function (page) {



    });



var indexPage = {





    //******************************************************************************************************************
    //******************************************************************************************************************

};
