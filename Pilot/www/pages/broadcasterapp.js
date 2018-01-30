

myApp.onPageInit('broadcasterApp', function (page) {


});

myApp.onPageBeforeRemove('broadcasterApp', function (page) {

    $$('#tb_remote').removeClass('disabled');

});

myApp.onPageBeforeAnimation('broadcasterApp', function (page) {

    broadcasterAppPage.checkConnection();

});



var broadcasterAppPage = {

    theURL: null,

    //******************************************************************************************************************
    checkConnection: function () {

        if (!globals.selectedGateway){
            myApp.alert('In order to WatchTV, you must first connect Pilot to a Gateway.', 'Connect To A Gateway', function () {
                mainView.router.load({url: 'pages/gateway.html'});
            });
            return;
        }

        broadcasterAppPage.buildURL();

    },

    //******************************************************************************************************************
    buildURL: function () {

        broadcasterAppPage.theURL = 'http://' + globals.selectedGateway.gatewayIP + globals.BroadcasterAppURL + '?&deviceID=' + globals.deviceID + '&deviceName=' + globals.deviceName + '&deviceType=' + globals.deviceType + '&displayCapabilities=' + globals.displayCapabilities ;

        //and display it
        $('#bcAppURLLabel').html(broadcasterAppPage.theURL);

    },

    //******************************************************************************************************************
    playContent: function (theURL) {


        if (globals.isBrowser) {
            window.open(theURL);
            return;
        }

        var win = cordova.InAppBrowser.open(theURL, '_blank', 'location=no,toolbar=no');

        win.addEventListener("loadstop", function (event) {
            if (event.url.match("mobile/close")) {
                win.close();
                mainView.router.load({url: 'index.html'});
            }
        });
    }
    //******************************************************************************************************************
    //******************************************************************************************************************

};

