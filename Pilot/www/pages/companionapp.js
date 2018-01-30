

myApp.onPageInit('companionApp', function (page) {




});

myApp.onPageBeforeRemove('companionApp', function (page) {



});

myApp.onPageBeforeAnimation('companionApp', function (page) {

    companionAppPage.checkConnection();

});



var companionAppPage = {


    theURL: null,

    //******************************************************************************************************************
    checkConnection: function () {

        if (!globals.selectedGateway){
            myApp.alert('In order to WatchTV, you must first connect Pilot to a Gateway.', 'Connect To A Gateway', function () {
                mainView.router.load({url: 'pages/gateway.html'});
            });
            return;
        }

        companionAppPage.buildURL();

    },

    //******************************************************************************************************************
    buildURL: function () {

        companionAppPage.theURL = 'http://' + globals.selectedGateway.gatewayIP + globals.CompanionAppURL + '?&deviceID=' + globals.deviceID + '&deviceName=' + globals.deviceName + '&deviceType=' + globals.deviceType + '&displayCapabilities=' + globals.displayCapabilities ;

        //and display it
        $('#caURLLabel').html(companionAppPage.theURL);

    },

    //******************************************************************************************************************
    playContent: function (theURL) {



        if (globals.isBrowser){
            window.open(theURL);
            return;
        }

        var win = cordova.InAppBrowser.open(theURL, '_blank', 'location=no,toolbar=no');

        win.addEventListener( "loadstop", function(event) {
            if (event.url.match("mobile/close")) {
                win.close();
                mainView.router.load({url: 'index.html'});
            }
        });



    }



    //******************************************************************************************************************
    //******************************************************************************************************************

};

