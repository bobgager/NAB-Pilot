
var gatewayConnector = {

    sendKeystroke: function (keyStroke) {

        console.log(' the key tapped was: ' + keyStroke);

        if (globals.useSimulatedGateway){

/*            myApp.showPreloader('Sending: ' + keyStroke + ' to Simulated Gateway');
            setTimeout(function () {
                myApp.hidePreloader();
            }, 1000);*/

            var notificationObject = {
                createTime: new Date().getTime(),
                notificationType: 'keyboardKeystroke',
                keyStroke: keyStroke
            };

            var gatewayID = '1234';

            awsConnector.saveNotification(gatewayID,notificationObject, gatewayConnector.SG_notificationSent)


        }

        else {

            myApp.showPreloader('Sending: ' + keyStroke + ' to Gateway');
            setTimeout(function () {
                myApp.hidePreloader();
            }, 500);

        }


    },

    //******************************************************************************************************************
    SG_notificationSent: function (success, data) {

        if (!success){
            myApp.alert(data)
        }

    }


};