/**
 * Created by bgager on 1/5/17.
 */

myApp.onPageInit('settings', function (page) {
    //myApp.alert('Here comes Settings page.');

    //Events to watch
    $$(document).on('click', '#update_BTN', settingsPage.updateApplication);
    $$(document).on('change', '#skinSelector', settingsPage.skinSelectorChange);

    //update the version number in the UI
    $$('#versionDisplay').html(globals.presentableVersion);

});

myApp.onPageBeforeRemove('settings', function (page) {

    //clean up event watchers
    $$(document).off('click', '#update_BTN', settingsPage.updateApplication);
    $$(document).off('change', '#skinSelector', settingsPage.skinSelectorChange);

});

myApp.onPageBeforeAnimation('settings', function (page) {

    if(globals.selectedGateway){
        $$('#gatewayNameLabel').html(globals.selectedGateway.name);
    }
    else{
        $$('#gatewayNameLabel').html('Please select a Gateway');
    }

    //set the useSimulatedGatewaySwitch checkbox
    $$('#useSimulatedGatewaySwitch').prop('checked', globals.useSimulatedGateway);

});



var settingsPage = {

    //******************************************************************************************************************
    setUseSimulatedGateway: function () {
        if ($('#useSimulatedGatewaySwitch').is(":checked")) {
            // it is checked
            globals.useSimulatedGateway = true;
        }
        else {
            globals.useSimulatedGateway = false;
        }
    },

    //******************************************************************************************************************
    skinSelectorChange: function () {
        if ($$('#skinSelector').is(':checked')){
            //console.log('skinSelector.val() = on');
            globals.skinStyle = 'OzNet';
        }
        else{
            //console.log('skinSelector.val() = off');
            globals.skinStyle = 'pilot';
        }

        setSkin();

    },

    //******************************************************************************************************************
    updateApplication: function () {
        if(globals.isBrowser){
            myApp.alert("You're running the browser version which is always up to date.", 'Attention!');
        }
        else{
            var ref = cordova.InAppBrowser.open('https://build.phonegap.com/apps/2424474/install/7AQ5kwxk6awKgpE7QWAV', '_system');
        }
    }

    //******************************************************************************************************************
    //******************************************************************************************************************

};