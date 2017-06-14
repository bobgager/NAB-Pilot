/**
 * Created by bgager on 1/5/17.
 */

myApp.onPageInit('customGateway', function (page) {

    //Events to watch
    $$(document).on('click', '#connectCustomGTWYBTN', customGatewayPage.connect);

});

myApp.onPageBeforeRemove('customGateway', function (page) {

    //clean up event watchers
    $$(document).off('click', '#connectCustomGTWYBTN', customGatewayPage.connect);

});

myApp.onPageBeforeAnimation('customGateway', function (page) {

    //set the values of the switches as the automatic form data storage doesn't seem to work for switches
    if(globals.customTestGateway.isPC){
        $$('#isPCSwitch').prop('checked', globals.customTestGateway.isPC);
        $$('#isFourKSwitch').prop('checked', globals.customTestGateway.isFourK);
    }


});



var customGatewayPage = {

    //******************************************************************************************************************
    connect: function () {

        //update the global customTestGateway info
        globals.customTestGateway.baseURL = $$('#customGatewayBaseURL').val();
        globals.customTestGateway.player = $$('#customGatewayPlayerType').val();
        globals.customTestGateway.ipAddress = $$('#customGatewayIpAddress').val();
        globals.customTestGateway.wsURL = $$('#customGatewayWsURL').val();
        globals.customTestGateway.deviceID = $$('#customGatewayDeviceID').val();
        globals.customTestGateway.portNum = $$('#customGatewayPortNum').val();

        if ($$('#isPCSwitch').is(':checked')) {
            globals.customTestGateway.isPC = true;
        } else {
            globals.customTestGateway.isPC = false;
        }

        if ($$('#isFourKSwitch').is(':checked')) {
            globals.customTestGateway.isFourK = true;
        } else {
            globals.customTestGateway.isFourK = false;
        }

        //concatenate url and update global customTestGateway url
        //format: <IP address of gateway>:<port#>/BaseURL?deviceID=<entry>&wsURL=<entry>&isPC=<entry>&isFourK=<entry>
        globals.customTestGateway.url = globals.customTestGateway.ipAddress +
                                        ":" + globals.customTestGateway.portNum +
                                        "/" + globals.customTestGateway.baseURL +
                                        "?deviceID=" + globals.customTestGateway.deviceID +
                                        "&wsURL=" + globals.customTestGateway.wsURL +
                                        "&isPC=" + globals.customTestGateway.isPC +
                                        "&isFourK=" + globals.customTestGateway.isFourK;

        //store the form data
        var storedData = myApp.formStoreData('customGatewayForm', {
            'customGatewayBaseURL': $$('#customGatewayBaseURL').val(),
            'customGatewayPlayerType': $$('#customGatewayPlayerType').val(),
            'customGatewayIpAddress': $$('#customGatewayIpAddress').val(),
            'customGatewayIsPC': globals.customTestGateway.isPC,
            'customGatewayIsFourK': globals.customTestGateway.isFourK,
            'customGatewayWsURL': $$('#customGatewayWsURL').val(),
            'customGatewayDeviceID': $$('#customGatewayDeviceID').val(),
            'customGatewayPortNum': $$('#customGatewayPortNum').val(),
            'customGatewayURL': globals.customTestGateway.url
        });

        //set the selectedGateway global with the selected gateway
        globals.gatewayList.forEach(function (gateway,index) {
            if(gateway.name === globals.customTestGateway.name){
                globals.selectedGateway = gateway;
                globals.gatewayList[index].status = 'Connected';

                //and store it on the device
                myApp.formStoreData('selectedGateway', gateway);

            }
            else{
                if (gateway.status === 'Connected'){
                    globals.gatewayList[index].status = 'Active';
                }
            }
        });


        //navigate to the Player page
        mainView.router.load({url: 'pages/player.html'});

    }



    //******************************************************************************************************************
    //******************************************************************************************************************

};

