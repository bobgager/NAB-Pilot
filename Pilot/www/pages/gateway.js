/**
 * Created by bgager on 1/5/17.
 */

myApp.onPageInit('gateway', function (page) {

    //Events to watch
    $$(document).on('click', '.gateway', gatewayPage.gatewayClicked);
    $$(document).on('click', '#clearGatewayBTN', gatewayPage.clearGatewayClicked);

    $$(document).on('refresh','.pull-to-refresh-content',gatewayPage.refreshPage)



});

myApp.onPageBeforeRemove('gateway', function (page) {

    //clean up event watchers
    $$(document).off('click', '.gateway', gatewayPage.gatewayClicked);
    $$(document).off('click', '#clearGatewayBTN', gatewayPage.clearGatewayClicked);
    $$(document).off('click', '#customGatewayBTN', gatewayPage.customGatewayClicked);

    $$(document).off('refresh','.pull-to-refresh-content',gatewayPage.refreshPage)

    //hide the toolbar
    myApp.hideToolbar($$('#gatewayToolbar'));

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

        myApp.pullToRefreshDone();

        gatewayPage.generateGateways();

    },

    //******************************************************************************************************************
    generateGateways: function () {

        myApp.showPreloader('Generating Hardcoded Gateways')
        setTimeout(function () {
            myApp.hidePreloader();
        }, 500);

        //clear the global list of gateways
        globals.gatewayList = [];


        //fill it full of some hard coded gateways

        /*var gateway0 = {};
        gateway0.name = 'Family Room';
        gateway0.url = 'http://192.168.1.2:88/MEDIA/livestream';
        gateway0.player = 'inappbrowser';
        gateway0.status = 'Active';
        globals.gatewayList.push(gateway0);

        var gateway1 = {};
        gateway1.name = 'Kids Room';
        gateway1.url = 'http://192.168.1.3:88/MEDIA/livestream';
        gateway1.player = 'inappbrowser';
        gateway1.status = 'Active';
        globals.gatewayList.push(gateway1);

        var gateway2 = {};
        gateway2.name = 'Master Bedroom';
        gateway2.url = '192.168.1.4:88/MEDIA/livestream';
        gateway2.player = 'inappbrowser';
        gateway2.status = 'Active';
        globals.gatewayList.push(gateway2);

        var gateway3 = {};
        gateway3.name = 'Cobalt Fire Test Gateway';
        gateway3.url = 'http://cobaltfire.com/demo/pilot/testpage.html';
        gateway3.player = 'inappbrowser';
        gateway3.status = 'Active';
        globals.gatewayList.push(gateway3);
*/
        var gateway4 = {};
        gateway4.name = '.mp4 Video Test Gateway';
        gateway4.url = 'http://cobaltfire.com/demo/pilot/PilotTestVideo.mp4';
        gateway4.player = 'streaming-media';
        gateway4.status = 'Active';
        globals.gatewayList.push(gateway4);

        var gateway5 = {};
        gateway5.name = 'Big Buck Bunny';
        gateway5.url = 'http://cobaltfire.com/demo/pilot/bunny.html';
        gateway5.player = 'inappbrowser';
        gateway5.status = 'Active';
        globals.gatewayList.push(gateway5);


        globals.gatewayList.push(globals.customTestGateway);


        //now, set the selected gateway as Connected if there is a selected gateway
        if(globals.selectedGateway){
            //set the selectedGateway global with the selected gateway
            globals.gatewayList.forEach(function (gateway,index) {
                if(gateway.name === globals.selectedGateway.name){
                    globals.gatewayList[index].status = 'Connected';
                }
            });
        }



        gatewayPage.renderGatewayList();
    },

    //******************************************************************************************************************
    renderGatewayList: function () {
        $$('#gatewayList').html('rendering gateway list');

        var gatewayListHTML = '<ul>';

        globals.gatewayList.forEach(function (gateway) {

            gatewayListHTML +=      '<li>';

            if(gateway.status === 'Active'){
                gatewayListHTML +=          '<a href="#" class="gateway activeGateway item-link item-content" data-gatewayName="'+ gateway.name +'"  >';
            }
            else{
                gatewayListHTML +=          '<a href="#" class="gateway item-content" data-gatewayName="'+ gateway.name +'"  >';
            }

            switch(gateway.status) {
                case 'Connected':
                    gatewayListHTML +=              '<div class="item-media"><img src="images/connected_gateway.png" width="200"></div>';
                    break;
                case 'Active':
                    gatewayListHTML +=              '<div class="item-media"><img src="images/active_gateway.png" width="200"></div>';
                    break;
                case 'Inactive':
                    gatewayListHTML +=              '<div class="item-media"><img src="images/inactive_gateway.png" width="200"></div>';
                    break;
                default:
                //no default code
            }


            if (gateway.status === 'Inactive'){
                gatewayListHTML +=              '<div class="item-inner inactive-gateway">';
            }
            else {
                gatewayListHTML +=              '<div class="item-inner">';
            }



            gatewayListHTML +=                  '<div class="item-title-row">';
            gatewayListHTML +=                      '<div class="item-title">NAME: '+ gateway.name +'</div>';
            gatewayListHTML +=                  '</div>';
            gatewayListHTML +=                  '<div class="item-subtitle">ADDRESS: '+ gateway.url +'</div>';
            gatewayListHTML +=                  '<div class="item-subtitle">HOSTNAME: '+ gateway.hostname +'</div>';
            gatewayListHTML +=                  '<div class="item-subtitle">PLAYER: '+ gateway.player +'</div>';
            gatewayListHTML +=                  '<div class="item-subtitle">STATUS: '+ gateway.status +'</div>';
            gatewayListHTML +=              '</div>';
            gatewayListHTML +=          '</a>';
            gatewayListHTML +=      '</li>';

        });


        gatewayListHTML +=  '<ul>';




        $$('#gatewayList').html(gatewayListHTML);

        //see if we should hide the back button
/*        if (!globals.selectedGateway){
            $$('#gatewayBackBTN').hide();
        }*/



    },

    //******************************************************************************************************************
    gatewayClicked: function (e) {
        //var theTarget = $$(this).data("gatewayName");
        //console.log('gateway Name= '+ $$(this).data("gatewayName"));

        var self = this;

        //hide the toolbar
        myApp.hideToolbar($$('#gatewayToolbar'));

        //see if they clicked on the Custom Gateway
        if($$(self).data("gatewayName") === globals.customTestGateway.name){
            mainView.router.load({url: 'pages/customGateway.html'});
            return;
        }

        //set the selectedGateway global with the selected gateway
        globals.gatewayList.forEach(function (gateway,index) {
            if(gateway.name === $$(self).data("gatewayName")){
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



    },

    //******************************************************************************************************************
    clearGatewayClicked: function () {

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
    customGatewayClicked: function () {
        //TODO
        myApp.alert("The Custom Gateway functionality is not implimented yet.", 'Sorry!');
    }

    //******************************************************************************************************************
    //******************************************************************************************************************

};

