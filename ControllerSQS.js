'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const controllerSQS = module.exports = {};

controllerSQS.sendMessage = async (delay, msgAttr, body, qeueURL) => {

    return new Promise((resolve, reject) => {
        try {
            let messageAttributes = {};

            messageAttributes.payload = {
                DataType: "String",
                StringValue: JSON.stringify(msgAttr)
            };

            let params = {
                DelaySeconds: delay,
                MessageAttributes: messageAttributes,
                MessageBody: body,
                QueueUrl: qeueURL
            };

            sqs.sendMessage(params, function (err, data) {
                if (err) {
                    console.log("Error", err);

                    return reject(err)
                } else {
                    console.log("Success", data.MessageId);

                    return resolve(params);
                }
            });
        } catch (e) {
            console.log(e.message)
        }
    });
};
