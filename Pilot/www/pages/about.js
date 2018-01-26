/**
 * Created by bgager on 1/5/17.
 */

myApp.onPageInit('about', function (page) {
    //myApp.alert('Here comes Settings page.');

    //Events to watch
    $$(document).on('click', '#openCFS_BTN', aboutPage.openCFS);

});

myApp.onPageBeforeRemove('about', function (page) {

    //clean up event watchers
    $$(document).off('click','#openCFS_BTN', aboutPage.openCFS);

});

myApp.onPageBeforeAnimation('about', function (page) {

    aboutPage.showDynamicInfo();

});



var aboutPage = {

    showDynamicInfo: function () {

        $$('#aboutVersionLabel').html('<br>Version #: ' + globals.presentableVersion);
        $$('#aboutCodeDateLabel').html('<br>Last Updated: ' + globals.codeDate);


        var device = Framework7.prototype.device;

        var dynamicInfo = '<span style="font-weight: bold">Some information about your device</span>';

        var deviceType = 'Browser';

        if (device.iphone) {
            dynamicInfo += '<br>You are running Pilot on an iPhone';
            deviceType = 'iPhone';
        }
        else {
            if (device.ipad) {
                dynamicInfo += '<br>You are running Pilot on an iPad';
                deviceType = 'iPad';
            }
            else {
                if (device.android){
                    dynamicInfo += '<br>You are running Pilot on an Android device';
                    deviceType = 'Android';
                }
                else {
                    dynamicInfo += '<br>You are running Pilot in a browser';
                }

            }
        }

        if (device.osVersion){
            dynamicInfo += "<br>Your "+ deviceType + "'s OS is: " + device.osVersion;
        }
        else {
            dynamicInfo += '<br>Your OS is unknown'
        }

        dynamicInfo += "<br>Your "+ deviceType + "'s screen dimensions are: "+ verge.viewportH() + "x" + verge.viewportW();


        dynamicInfo += "<br>The Pixel Ratio of your "+ deviceType + "'s screen is: " + device.pixelRatio;


        if (!globals.longitude){
            dynamicInfo += "<br>Your Longitude/Latitude has not been determined yet."
        }
        else {
            dynamicInfo += "<br>Your Longitude is: " + globals.longitude;
            dynamicInfo += "<br>Your Latitude is: " + globals.latitude;
        }


        if (deviceType === 'Browser'){
            $$('#dynamicPilotInfo').html(dynamicInfo);
            return;
        }

        var ipAddress = 'unkown';
        networkinterface.getIPAddress(function (ip) {
            dynamicInfo += "<br>The IP Address of your "+ deviceType + " is: " + ip;
            aboutPage.showDynamicInfo2(dynamicInfo, deviceType)
        });


    },

    showDynamicInfo2: function (dynamicInfo, deviceType) {

        dynamicInfo += "<br>A Unique Identifier for your "+ deviceType + " is: " + device.uuid ;

        $$('#dynamicPilotInfo').html(dynamicInfo);


    },

    //******************************************************************************************************************
    openCFS: function () {

        if (globals.isBrowser){
            window.open('http://www.cobaltfire.com', '_blank');
            return;
        }
        var ref = cordova.InAppBrowser.open('http://cobaltfire.com', '_system');
    }



    //******************************************************************************************************************
    //******************************************************************************************************************

};

