

myApp.onPageInit('scanGateway', function (page) {

    if (globals.isBrowser){
        return
    }

    QRScanner.prepare(
        function onDone(err, status){
            if (err) {
                // here we can handle errors and clean up any loose ends.
                myApp.alert(err);
            }
            if (status.authorized) {
                // W00t, you have camera access and the scanner is initialized.
                // QRscanner.show() should feel very fast.
                console.log('prepare authorized')
            } else if (status.denied) {
                // The video preview will remain black, and scanning is disabled. We can
                // try to ask the user to change their mind, but we'll have to send them
                // to their device settings with `QRScanner.openSettings()`.
                console.log('prepare denied')
            } else {
                // we didn't get permission, but we didn't get permanently denied. (On
                // Android, a denial isn't permanent unless the user checks the "Don't
                // ask again" box.) We can ask again at the next relevant opportunity.

                console.log('prepare not authorized but not denied')
            }
        }
    );


});

myApp.onPageBeforeRemove('scanGateway', function (page) {


});

myApp.onPageBeforeAnimation('scanGateway', function (page) {

    $('#scanInstructions').html('Please scan the QR Code from your TV')

    myApp.hideToolbar($$('#gatewayToolbar'));
    myApp.showToolbar($$('#gatewayScannerToolbar'));

});

myApp.onPageAfterAnimation('scanGateway', function (page) {

    scanGatewayPage.startScan();

});



var scanGatewayPage = {

    lastScannedText: '',

    startScan: function () {
        //hide a bunch of stuff so we can see the scanner
        $('.pages').addClass("background-hidden");
        $('.page').addClass("background-hidden");
        $('.page-content').addClass("background-hidden");
        $('.view').addClass("background-hidden");
        $('.views').addClass("background-hidden");
        $(".layout-dark").addClass("background-hidden");



        if (globals.isBrowser){
            return
        }

        console.log('about to call QRScanner.scan');
        QRScanner.scan(
            scanGatewayPage.scanComplete
        );

        console.log('about to call QRScanner.show');
        QRScanner.show();
    },

    //******************************************************************************************************************
    scanComplete: function (err, text) {

        // The scan completed,

        //stop scanning and freeze the frame
        QRScanner.pausePreview(function(status){
            console.log(status);
        });

        //make sure the QR code seems to be a valid Gateway QR code
        if (!err){
            if (text.indexOf('gatewayIP') === -1){
                //not a valid Gateway QR code
                myApp.alert("That doesn't seem to be a QR code from a Pilot Gateway.", 'Please Try Again', function () {
                    QRScanner.scan(
                        scanGatewayPage.scanComplete
                    );
                });

                return;
            }
        }

        $('#scanInstructions').html('<span style="color: #00d449">QR Code Scan Complete</span>');




        if(err){
            // an error occurred, or the scan was canceled (error code `6`)
            myApp.alert('QRScanner.scan error: ' + err);
            scanGatewayPage.lastScannedText = '';
            scanGatewayPage.finishScan();
        }
        else {

            scanGatewayPage.lastScannedText = text;

            setTimeout(scanGatewayPage.finishScan, 1000);

        }
    },

    //******************************************************************************************************************
    finishScan: function () {

        $('.pages').removeClass("background-hidden");
        $('.page').removeClass("background-hidden");
        $('.page-content').removeClass("background-hidden");
        $('.view').removeClass("background-hidden");
        $('.views').removeClass("background-hidden");
        $(".layout-dark").removeClass("background-hidden");

        if(!globals.isBrowser){
            QRScanner.hide(function(status){
                console.log(status);
            });

            QRScanner.destroy(function(status){
                console.log(status);
            });
        }

        myApp.hideToolbar($$('#gatewayScannerToolbar'));
        myApp.showToolbar($$('#gatewayToolbar'));

        if (scanGatewayPage.lastScannedText !== ''){

            var newGateway = JSON.parse(scanGatewayPage.lastScannedText);

            newGateway.status = 'Active';

            //if it's a simulated gateway, store the deviceID
            if (newGateway.gatewayIP === 'cobaltfire.com'){
                globals.gatewaySimulatorID = newGateway.deviceId;
            }


            //make sure this Gateway isn't already in the list
            var inList = false;

            globals.gatewayList.forEach(function (gateway,index) {
                if(gateway.deviceId === newGateway.deviceId){
                    //it's already there
                    inList = true;
                }
            });

            if (inList){
                myApp.alert('This Gateway has already been scanned and is already in the Gateway List','Existing Gateway');
            }
            else {
                //add it to the list of gateways
                globals.gatewayList.push(newGateway);

                //and store the list on the device
                myApp.formStoreData('gatewayList', globals.gatewayList);

            }

        }

        mainView.router.load({url: 'pages/gateway.html?deviceId=' + newGateway.deviceId});

    },

    //******************************************************************************************************************
    cancelScan: function () {
        scanGatewayPage.lastScannedText = '';
        scanGatewayPage.finishScan();
    },

    //******************************************************************************************************************
    fakeScan: function () {

        var deviceId = cobaltfireUtils.guid().substr(0,4);

        scanGatewayPage.lastScannedText = '{"wsURL":"","deviceId":"' + deviceId + '","name":"Bobs Room ' + deviceId + '","accountId":"500","gatewayIP":"echo.websocket.org"}';
        scanGatewayPage.finishScan();
    }


    //******************************************************************************************************************
    //******************************************************************************************************************

};

