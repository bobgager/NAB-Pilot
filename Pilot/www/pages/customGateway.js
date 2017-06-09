/**
 * Created by bgager on 1/5/17.
 */

myApp.onPageInit('customGateway', function (page) {
    //myApp.alert('Here comes Settings page.');

    //Events to watch
    $$(document).on('click', '#connectCustomGTWYBTN', customGatewayPage.connect);

});

myApp.onPageBeforeRemove('customGateway', function (page) {

    //clean up event watchers
    $$(document).off('click', '#connectCustomGTWYBTN', customGatewayPage.connect);

});



var customGatewayPage = {

    //******************************************************************************************************************
    connect: function () {

        if ($$('#customGatewayURL').val().length === 0){
            myApp.alert("Please enter a Gateway URL before trying to connect.", 'Attention!');
            return;
        }

        //update the global customTestGateway info
        globals.customTestGateway.url = $$('#customGatewayURL').val();
        globals.customTestGateway.player = $$('#customGatewayPlayerType').val();



        //store the form data
        var storedData = myApp.formStoreData('customGatewayForm', {
            'customGatewayURL': $$('#customGatewayURL').val(),
            'customGatewayPlayerType': $$('#customGatewayPlayerType').val()
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

