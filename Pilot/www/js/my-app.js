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



//after some fake initialization delay, load the proper page
//depending on a gateway being selected or not

globals.selectedGateway = myApp.formGetData('selectedGateway');
setTimeout(function(){

    //check to see if a Gateway has previously been selected
    if (globals.selectedGateway){
        mainView.router.load({url: 'pages/player.html', animatePages: false});

    }
    else {
        //a gateway has never been selected, or was previously cleared.
        mainView.router.load({url: 'pages/gateway.html', animatePages: false});

    }
}, 1000);


//**********************************************************************************************************************
//global functions
//**********************************************************************************************************************

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