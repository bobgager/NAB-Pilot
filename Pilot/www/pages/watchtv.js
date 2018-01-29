

myApp.onPageInit('watchTV', function (page) {


});

myApp.onPageBeforeRemove('watchTV', function (page) {


});

myApp.onPageBeforeAnimation('watchTV', function (page) {

    watchTVPage.checkConnection();

});



var watchTVPage = {

    theURL: null,

    //******************************************************************************************************************
    checkConnection: function () {

        if (!globals.selectedGateway){
            myApp.alert('In order to WatchTV, you must first connect Pilot to a Gateway.', 'Connect To A Gateway', function () {
                mainView.router.load({url: 'pages/gateway.html'});
            });
            return;
        }

        watchTVPage.buildURL();

    },

    //******************************************************************************************************************
    buildURL: function () {

        watchTVPage.theURL = 'http://' + globals.selectedGateway.gatewayIP + globals.WatchTVAppURL + '?&deviceID=' + globals.deviceID + '&deviceName=' + globals.deviceName + '&deviceType=' + globals.deviceType + '&displayCapabilities=' + globals.displayCapabilities ;

        //and display it
        $('#urlLabel').html(watchTVPage.theURL);

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

