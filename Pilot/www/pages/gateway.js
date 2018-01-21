/**
 * Created by bgager on 1/5/17.
 */

myApp.onPageInit('gateway', function (page) {

    //Events to watch
    /*$$(document).on('click', '.gateway', gatewayPage.gatewayClicked);*/



});

myApp.onPageBeforeRemove('gateway', function (page) {

    //clean up event watchers
    /*$$(document).off('click', '.gateway', gatewayPage.gatewayClicked);*/


});

myApp.onPageAfterAnimation('gateway', function (page) {

    gatewayPage.refreshPage();



});

myApp.onPageBeforeAnimation('gateway', function (page) {

    //show the toolbar
    myApp.showToolbar($$('#gatewayToolbar'));

});



var gatewayPage = {


    //******************************************************************************************************************
    refreshPage: function () {

        gatewayPage.renderGatewayList();

    },

    //******************************************************************************************************************
    renderGatewayList: function () {

        //see if there are any gateways saved
        if (globals.gatewayList.length === 0){

            $$('#gatewayListTitle').html('There are no saved Gateways');
            $$('#gatewayList').html('Please click "Scan New Gateway" below to add a Gateway.');

            $$('#clearGatewayBTN').addClass('disabled');

            return;

        }
        else {

            $$('#gatewayListTitle').html('');
            $$('#gatewayList').html('Rendering gateway list');

        }

        //set the selected gateway as Connected if there is a selected gateway
        if(globals.selectedGateway){
            //set the selectedGateway global with the selected gateway
            globals.gatewayList.forEach(function (gateway,index) {
                if(gateway.deviceId === globals.selectedGateway.deviceId){
                    globals.gatewayList[index].status = 'Connected';
                    $$('#clearGatewayBTN').removeClass('disabled');
                }
                else {
                    globals.gatewayList[index].status = 'Active';
                }
            });
        }
        else {
            //clear the Connected state for all the gateways
            globals.gatewayList.forEach(function (gateway,index) {
                globals.gatewayList[index].status = 'Active';
            });
        }
        //and store the list on the device
        myApp.formStoreData('gatewayList', globals.gatewayList);

        //{"wsURL":"1234","deviceId":"gateway1","name":"Bobs Room","accountId":"500","gatewayIP":"192.168.0.1"}

        var gatewayListHTML = '<ul>';

        globals.gatewayList.forEach(function (gateway) {

/*            gatewayListHTML +=      '<li>';


            switch(gateway.status) {
                case 'Connected':
                    gatewayListHTML +=          '<a href="#" class="gateway item-content" data-gatewayDeviceId="'+ gateway.deviceId +'"  >';
                    gatewayListHTML +=              '<div class="item-media"><img src="images/connected_gateway.png" width="200"></div>';
                    break;
                case 'Active':
                    gatewayListHTML +=          '<a href="#" class="gateway  item-link item-content" data-gatewayDeviceId="'+ gateway.deviceId +'"  >';
                    gatewayListHTML +=              '<div class="item-media"><img src="images/active_gateway.png" width="200"></div>';
                    break;
                default:
                //no default code
            }

            gatewayListHTML +=              '<div class="item-inner" >';

            //gatewayListHTML +=                  '<div class="item-title-row">';
            gatewayListHTML +=                      '<div class="item-title">NAME: '+ gateway.name +'</div>';
            //gatewayListHTML +=                  '</div>';
            gatewayListHTML +=                  '<div class="item-subtitle">wsURL: '+ gateway.wsURL +'</div>';
            gatewayListHTML +=                  '<div class="item-subtitle">deviceId: '+ gateway.deviceId +'</div>';
            gatewayListHTML +=                  '<div class="item-subtitle">accountId: '+ gateway.accountId +'</div>';
            gatewayListHTML +=                  '<div class="item-subtitle">gatewayIP: '+ gateway.gatewayIP +'</div>';
            gatewayListHTML +=                  '<div class="item-after">Another label</div>';

            gatewayListHTML +=              '</div>';


            gatewayListHTML +=          '</a>';
            gatewayListHTML +=      '</li>';*/




            gatewayListHTML +=      '<li class="item-content">';

            switch(gateway.status) {
                case 'Connected':
                    gatewayListHTML +=              '<div class="item-media"><img src="images/connected_gateway.png" width="200"></div>';
                    break;
                case 'Active':
                    gatewayListHTML +=              '<div class="item-media"><img src="images/active_gateway.png" width="200"></div>';
                    break;
                default:
                //no default code
            }


            gatewayListHTML +=          '<div class="item-inner">';

            gatewayListHTML +=          '<div class="row" style="width: 100%">';


            switch(gateway.status) {
                case 'Connected':
                    gatewayListHTML +=              '<div class="col-60" style="font-weight: bold; color: white">';
                    break;
                case 'Active':
                    gatewayListHTML +=              '<div class="col-70">';
                    break;
                default:
                //no default code
            }


            gatewayListHTML +=                  '<div class="item-title">NAME: '+ gateway.name +'</div>';
            gatewayListHTML +=                  '<div class="item-subtitle">wsURL: '+ gateway.wsURL +'</div>';
            gatewayListHTML +=                  '<div class="item-subtitle">deviceId: '+ gateway.deviceId +'</div>';
            gatewayListHTML +=                  '<div class="item-subtitle">accountId: '+ gateway.accountId +'</div>';
            gatewayListHTML +=                  '<div class="item-subtitle">gatewayIP: '+ gateway.gatewayIP +'</div>';
            gatewayListHTML +=              '</div>';
            gatewayListHTML +=              '<div class="col-30"><br>';

            switch(gateway.status) {
                case 'Connected':
                    gatewayListHTML +=                  '<div><a class="button"  href="#" onclick="gatewayPage.disconnectGateway()"><i class="fas fa-unlink"></i>&nbsp;&nbsp;Disconnect</a></div>';
                    break;
                case 'Active':
                    gatewayListHTML +=                  '<div><a class="button"  href="#" onclick="gatewayPage.connectGateway(&#39;' + gateway.deviceId + '&#39;)"><i class="fas fa-link"></i>&nbsp;&nbsp;Connect</a></div>';
                    gatewayListHTML +=                  '<div><a class="button mt-10"  href="#" onclick="gatewayPage.deleteGateway(&#39;' + gateway.deviceId + '&#39;)"><i class="far fa-times-circle"></i>&nbsp;&nbsp;Delete</a></div>';
                    break;
                default:
                //no default code
            }

            gatewayListHTML +=              '</div>';
            gatewayListHTML +=          '</div> ';

            gatewayListHTML +=          '</div>';
            gatewayListHTML +=      '</li>';

        });

        gatewayListHTML +=  '<ul>';

        $$('#gatewayList').html(gatewayListHTML);

    },

    //******************************************************************************************************************
    connectGateway: function (deviceId) {

        var theGateway = null;

        //clear any previously connected gateway
        globals.selectedGateway = null;
        //and clear it on the device
        myApp.formStoreData('selectedGateway', null);

        //get the gateway object
        globals.gatewayList.forEach(function (gateway,index) {

            //mark all  Gateways as Active
            globals.gatewayList[index].status = 'Active';

            //capture the gaateway that was clickedx`
            if(gateway.deviceId === deviceId){
                theGateway = gateway;
            }

        });

        gatewayConnector.connectToGateway(theGateway, gatewayPage.connectionCallback);

    },

    //******************************************************************************************************************
    connectionCallback: function (success, connectedGateway, err) {

        if (!success){
            //we failed to connect properly
            myApp.alert('Gateway connection failed.<br>' + err, 'Connection Error');
            gatewayPage.refreshPage();
            return;
        }


        //set the selectedGateway global with the connected gateway

        globals.gatewayList.forEach(function (gateway,index) {
            if(gateway.deviceId === connectedGateway.deviceId){
                globals.selectedGateway = gateway;
                globals.gatewayList[index].status = 'Connected';

                //and store it on the device
                myApp.formStoreData('selectedGateway', gateway);

            }
        });

        //and store the list on the device
        myApp.formStoreData('gatewayList', globals.gatewayList);

        //navigate to the Home page
        mainView.router.load({url: 'index.html'});


    },

    //******************************************************************************************************************
    disconnectGateway: function () {

        globals.selectedGateway = null;
        //and store it on the device
        myApp.formStoreData('selectedGateway', null);

        //remove the connected status
        globals.gatewayList.forEach(function (gateway,index) {
            if (gateway.status === 'Connected'){
                globals.gatewayList[index].status = 'Active';
            }
        });

        //re-render the gateway list
        gatewayPage.renderGatewayList();

    },

    //******************************************************************************************************************
    deleteGateway: function (deviceId) {

        globals.gatewayList.forEach(function (gateway,index) {
            if(gateway.deviceId === deviceId){

                myApp.confirm('Are you sure you want to delete ' + gateway.name + '?', 'Confirm Delete', function () {

                    globals.gatewayList.splice(index, 1);

                    //and store the list on the device
                    myApp.formStoreData('gatewayList', globals.gatewayList);

                    //re-render the gateway list
                    gatewayPage.renderGatewayList();

                });

            }

        });

    }

    //******************************************************************************************************************
    //******************************************************************************************************************

};

