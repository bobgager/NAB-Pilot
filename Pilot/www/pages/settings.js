/**
 * Created by bgager on 1/5/17.
 */

myApp.onPageInit('settings', function (page) {

    //Events to watch
    $$(document).on('click', '#update_BTN', settingsPage.updateApplication);
    $$(document).on('keyup', '#WatchTVAppURLInput', settingsPage.updateWatchTVURL);
    $$(document).on('keyup', '#companionDeviceNameInput', settingsPage.updateDeviceName);
    $$(document).on('click', '.displaySwitch', settingsPage.updateDisplayCapability);

    //update the version number in the UI
    $$('#versionDisplay').html(globals.presentableVersion);

});

myApp.onPageBeforeRemove('settings', function (page) {

    //clean up event watchers
    $$(document).off('click', '#update_BTN', settingsPage.updateApplication);
    $$(document).off('keyup', '#WatchTVAppURLInput', settingsPage.updateWatchTVURL);
    $$(document).off('keyup', '#companionDeviceNameInput', settingsPage.updateDeviceName);
    $$(document).off('click', '.displaySwitch', settingsPage.updateDisplayCapability);

});

myApp.onPageBeforeAnimation('settings', function (page) {

    //set the gatewaySimulatorIDLabel
    $$('#gatewaySimulatorIDLabel').html('gatewaySimulatorID: ' + globals.gatewaySimulatorID);

    //set the value of the companionDeviceIDInput input
    $('#companionDeviceIDInput').val(globals.deviceID);

    //set the value of the companionDeviceNameInput input
    $('#companionDeviceNameInput').val(globals.deviceName);

    //set the value of the companionDeviceTypeInput input
    $('#companionDeviceTypeInput').val(globals.deviceType);

    //set the value of the displayCapabilities switches
    switch(globals.displayCapabilities) {
        case 'HD':
            $('#HDSwitch').prop('checked', true);
            $('#4KSwitch').prop('checked', false);
            $('#HDRSwitch').prop('checked', false);
            break;
        case '4K':
            $('#HDSwitch').prop('checked', false);
            $('#4KSwitch').prop('checked', true);
            $('#HDRSwitch').prop('checked', false);
            break;
        case 'HDR':
            $('#HDSwitch').prop('checked', false);
            $('#4KSwitch').prop('checked', false);
            $('#HDRSwitch').prop('checked', true);
            break;
        default:
            $('#HDSwitch').prop('checked', false);
            $('#4KSwitch').prop('checked', false);
            $('#HDRSwitch').prop('checked', false);
    }

    //set the value of the WatchTVURL input
    $('#WatchTVAppURLInput').val(globals.WatchTVAppURL);

    //hide all the toolbars
    myApp.hideToolbar($$('#gatewayToolbar'));
    myApp.hideToolbar($$('#gatewayScannerToolbar'));
    myApp.hideToolbar($$('#mainToolbar'));

});



var settingsPage = {

    //******************************************************************************************************************
    updateDisplayCapability: function (e) {

        //var target = e.target.id;

        switch(e.target.id) {
            case 'HDSwitch':
                globals.displayCapabilities = 'HD';
                $('#HDSwitch').prop('checked', true);
                $('#4KSwitch').prop('checked', false);
                $('#HDRSwitch').prop('checked', false);
                break;
            case '4KSwitch':
                globals.displayCapabilities = '4K';
                $('#HDSwitch').prop('checked', false);
                $('#4KSwitch').prop('checked', true);
                $('#HDRSwitch').prop('checked', false);
                break;
            case 'HDRSwitch':
                globals.displayCapabilities = 'HDR';
                $('#HDSwitch').prop('checked', false);
                $('#4KSwitch').prop('checked', false);
                $('#HDRSwitch').prop('checked', true);
                break;
            default:
                $('#HDSwitch').prop('checked', false);
                $('#4KSwitch').prop('checked', false);
                $('#HDRSwitch').prop('checked', false);
        }

    },

    //******************************************************************************************************************
    updateDeviceName: function (e) {

        globals.deviceName = $('#companionDeviceNameInput').val();
        myApp.formStoreData('deviceName',$('#companionDeviceNameInput').val());

    },

    //******************************************************************************************************************
    updateWatchTVURL: function (e) {

        globals.WatchTVAppURL = $('#WatchTVAppURLInput').val();

    },

    //******************************************************************************************************************
    updateApplication: function () {
        if(globals.isBrowser){
            myApp.alert("You're running the browser version which is always up to date.", 'Attention!');
        }
        else{
            var ref = cordova.InAppBrowser.open('https://build.phonegap.com/apps/2424474/install/7AQ5kwxk6awKgpE7QWAV', '_system');
        }
    },

    //******************************************************************************************************************
    setSimulatedGatewayID: function () {

        myApp.prompt('Please enter the deviceId shown on the Simulated gateway', 'Simulated Gateway Device ID', function (value) {
            globals.gatewaySimulatorID = value;
            //set the useSimulatedGatewaySwitch checkbox
            $$('#gatewaySimulatorIDLabel').html('gatewaySimulatorID: ' + globals.gatewaySimulatorID);
        });

    }

    //******************************************************************************************************************
    //******************************************************************************************************************

};