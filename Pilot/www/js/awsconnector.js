/**
 * Created by bgager on 2/4/16.
 */

var awsConnector = {

    dynamodbEast: null,

    //******************************************************************************************************************
    initializeAWS: function(callback){

        // set the default config object
        var creds = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:f769f5d7-6530-4e45-a689-27226bb6d05e'
        });
        AWS.config.credentials = creds;

        AWS.config.region = 'us-east-1';

        //console.log('creating dynamodbEast');
        this.dynamodbEast = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
        //console.log('dynamodbEast creation complete');

        if (callback){
            callback();
        }

    },


    //******************************************************************************************************************
    saveNotification: function (gatewayID, notificationObject, callback) {

        var params = {
            TableName : 'pilot_queue',
            Item: {

                gatewayID: gatewayID,
                itemID: cobaltfireUtils.guid(),

                notificationObject: notificationObject

            }
        };

        this.dynamodbEast.put(params, function(err, data) {
            //console.log('err= ' + err);
            if (err){
                //console.log(err);
                callback(false, err);
            }
            else{
                //console.log(data);
                callback(true);
            }

        });

    },

    //******************************************************************************************************************
    fetchQueue: function(gatewayID, callback){

        var params = {
            TableName: 'pilot_queue',
            KeyConditionExpression: 'gatewayID = :gatewayID ',
            ExpressionAttributeValues: {
                ':gatewayID': gatewayID
            }
        };

        awsConnector.dynamodbEast.query(params, function(err, data) {
            //console.log('query returned: '+  err);
            if (err){
                callback(false, err);
            }
            else {
                //console.log(data);
                callback(true, data.Items);
            }
        });
    },

    //******************************************************************************************************************
    deleteNotification: function (locationID, notificationID) {

        var params = {
            TableName : 'iqNotificationQueue',
            Key: {
                locationID: locationID,
                notificationID: notificationID
            }
        };

        this.dynamodbEast.delete(params, function(err, data) {
            //console.log('delete returned: '+  err);
            if (err){

            }
            else{

            }
        });

    },

    //******************************************************************************************************************
    updateNotification: function (theNotification) {
        var params = {
            TableName: 'iqNotificationQueue',
            Key: { locationID : theNotification.locationID, notificationID : theNotification.notificationID },

            UpdateExpression: "set notificationObject = :notificationObject",
            ExpressionAttributeValues:{
                ":notificationObject":theNotification.notificationObject
            }
        };

        this.dynamodbEast.update(params, function(err, data) {

            //console.log('tried to update display slide and err= ' + err);

            if (err){
                //console.log(err);
                console.log(err);
            }
            else {
                //console.log(data);

            }
        });

    }

    //******************************************************************************************************************
    //******************************************************************************************************************
    //******************************************************************************************************************
};