/**
 * Created by bgager on 1/5/17.
 */

myApp.onPageInit('player', function (page) {

    //Events to watch
    $$(document).on('click', '#playBtn', playerPage.playContent);

});

myApp.onPageBeforeRemove('player', function (page) {

    //clean up event watchers
    $$(document).off('click','#playBtn', playerPage.playContent);

});

myApp.onPageBeforeAnimation('player', function (page) {

    if (globals.selectedGateway){
        //a gateway was previously selected on this device
        $$('#selectedGatewayMessage').html(globals.selectedGateway.name + '<br>' + globals.selectedGateway.url + '<br>' + globals.selectedGateway.player);
        $$('#selectedGatewayHeader').html('Selected Gateway');
        $$('#selectedGatewayPlayBTN').show();
    }
    else{
        $$('#selectedGatewayHeader').html('No Gateway Selected');
        $$('#selectedGatewayMessage').html('Please go to Settings to select a Gateway');
        $$('#selectedGatewayPlayBTN').hide();
    }

});



var playerPage = {

    //******************************************************************************************************************
    playContent: function () {

        switch(globals.selectedGateway.player) {
            case 'inappbrowser':

                if (globals.isBrowser){
                    myApp.alert("The embedded player is not implimented in the browser version of Pilot.<br>Please use the mobile app.", 'Attention!');
                    return;
                }

                 var win = cordova.InAppBrowser.open(globals.selectedGateway.url, '_blank', 'location=no,toolbar=no');

                win.addEventListener( "loadstop", function(event) {
                    if (event.url.match("mobile/close")) {
                        win.close();
                    }
                });

                break;

            case 'streaming-media':

                if (globals.isBrowser){
                    myApp.alert("The Streaming Media player is not implimented in the browser version of Pilot.<br>Please use the mobile app.", 'Attention!');
                    return;
                }

                window.plugins.streamingMedia.playVideo(globals.selectedGateway.url);

                break;

            default:
                myApp.alert("It seems a player wasn't defined for this Gateway", 'Attention!');
        }

    }

    //******************************************************************************************************************




    //******************************************************************************************************************
    //******************************************************************************************************************

};

