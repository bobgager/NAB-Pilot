
var gatewayConnector = {

    ws: null,

    //******************************************************************************************************************
    sendKeystroke: function (keyStroke, device) {

        var JSONobject = { device: device, data: { keyCharacter: keyStroke }};


        if (globals.isBrowser){

            gatewayConnector.logToSimulatedGateway(JSON.stringify(JSONobject));

        }

        else {

            gatewayConnector.sendWebSocket(JSON.stringify(JSONobject));

        }

    },

    //******************************************************************************************************************
    connectToGateway: function (gateway,callback) {

        //build the full websocket URL

        if (gateway.gatewayIP === 'cobaltfire.com'){
            //we're using the gateway simulator
            globals.wsURL =  'ws://echo.websocket.org'
        }
        else {
            //we're using a real gateway
            globals.wsURL =  'ws://' + gateway.gatewayIP + gateway.wsURL ;
        }

        var JSONobject = { key: 'pairCompanion', data: { geolocation: '32.7254,-97.3208' }};

        if (globals.isBrowser){

            gatewayConnector.logToSimulatedGateway(JSON.stringify(JSONobject));

        }

        else {

            gatewayConnector.sendWebSocket(JSON.stringify(JSONobject));

        }


        callback(true, gateway, 'TestError');
    },

    //******************************************************************************************************************
    logToSimulatedGateway: function (packetString) {

        var notificationObject = {
            createTime: new Date().getTime(),
            notificationType: 'webSocketNotification',
            packet: packetString
        };

        awsConnector.saveNotification(globals.gatewaySimulatorID, notificationObject, gatewayConnector.SG_notificationSent)

    },

    //******************************************************************************************************************
    sendWebSocket: function (packetString) {

        gatewayConnector.logToSimulatedGateway('Creating ws:// to URL: ' + globals.wsURL);
        var webSocket = new WebSocket(globals.wsURL);

        webSocket.onopen = function () {
            //myApp.alert('Websocket Open.');
            gatewayConnector.logToSimulatedGateway('WebSocket Send | ' + packetString);
            this.send(packetString);         // transmit packetString after connecting
        };

        webSocket.onmessage = function (event) {
            //myApp.alert('Response from ws://echo.websocket.org. ' + event.data);
            gatewayConnector.logToSimulatedGateway('Websocket Response | ' + event.data);
            this.close();
        };

        webSocket.onerror = function () {
            //myApp.alert('Websocket error occurred!');
            gatewayConnector.logToSimulatedGateway('Websocket error occurred!');
        };

        webSocket.onclose = function (event) {
            //myApp.alert('close code=' + event.code);
            gatewayConnector.logToSimulatedGateway('Websocket close code=' + event.code);
        };

    },

    //******************************************************************************************************************
    SG_notificationSent: function (success, data) {

        if (!success){
            myApp.alert(data)
        }

    }

    //******************************************************************************************************************

};