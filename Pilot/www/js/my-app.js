// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

//see if we're running in the browser
if(myApp.device.os){
    globals.isBrowser = false;
}



//******************************************************************************************************************
function geoSuccess(position) {

    //myApp.alert('geoSuccess');
    console.log('geoSuccess');
    console.log(position);

    globals.latitude =  position.coords.latitude;
    globals.longitude = position.coords.longitude;

    /*alert('Latitude: '          + position.coords.latitude          + '\n' +
        'Longitude: '         + position.coords.longitude         + '\n' +
        'Altitude: '          + position.coords.altitude          + '\n' +
        'Accuracy: '          + position.coords.accuracy          + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        'Heading: '           + position.coords.heading           + '\n' +
        'Speed: '             + position.coords.speed             + '\n' +
        'Timestamp: '         + position.timestamp                + '\n');*/

}

//******************************************************************************************************************
function geoError(error) {
    //myApp.alert('geolocation error: code: '    + error.code    + 'message: ' + error.message );
    console.log('geolocation error: code: '    + error.code    + 'message: ' + error.message );
    //try again
    cordova.plugins.locationServices.geolocation.getCurrentPosition(geoSuccess, geoError);
}

//******************************************************************************************************************
// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {

    console.log('about to call geolocation in deviceReady');
    cordova.plugins.locationServices.geolocation.getCurrentPosition(geoSuccess, geoError);

    //grab the UUID of the device
    globals.deviceID = device.uuid;

});

setSkin();

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

myApp.hideToolbar($$('#gatewayToolbar'));

// get the list of stored gateways
globals.gatewayList = myApp.formGetData('gatewayList');
if (!globals.gatewayList){
    globals.gatewayList = [];
}

// get any stored selected gateway info
globals.selectedGateway = myApp.formGetData('selectedGateway');

// get the stored deviceName
globals.deviceName = myApp.formGetData('deviceName');
if (!globals.deviceName){
    globals.deviceName = 'Pilot Companion';
}

setTimeout(function(){

    //hide the initializing div
    $$('#initializingCard').hide();

    indexPage.displayGateway();

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

        myApp.hideToolbar($$('#gatewayToolbar'));
        myApp.hideToolbar($$('#gatewayScannerToolbar'));
        myApp.showToolbar($$('#mainToolbar'));

        indexPage.displayGateway();


    });

    myApp.onPageAfterAnimation('index', function (page) {



    });



var indexPage = {

    displayGateway: function () {
        //check to see if a Gateway has previously been selected
        if (globals.selectedGateway){
            $('#connectedGatewayLabel').html('You are connected to: ' + globals.selectedGateway.name);

        }
        else {
            //a gateway has never been selected, or was previously cleared.
            $('#connectedGatewayLabel').html('You are not connected to a Gateway<br>Please tap the Gateway icon below to get connected');

        }
    }



    //******************************************************************************************************************
    //******************************************************************************************************************

};
