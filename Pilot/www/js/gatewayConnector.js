
var gatewayConnector = {

    sendKeystroke: function (keyStroke, device) {

        //console.log(' the key tapped was: ' + keyStroke);

        switch(device) {
            case "keyboard":
                var notificationType = 'keyboardKeystroke';
                break;
            case "remote":
                var notificationType = 'remoteKeystroke';
                break;
            default:
            //code block
        }

        if (globals.useSimulatedGateway){

            var notificationObject = {
                createTime: new Date().getTime(),
                notificationType: notificationType,
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