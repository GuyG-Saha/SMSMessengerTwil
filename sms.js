// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const TWILIO_PHONE_NUMBER = '+19787486550';

const sendSms = (phone, message) => {
    client.messages
        .create({
            body: message,
            from: TWILIO_PHONE_NUMBER,
            to: phone
        })
        .then(message => console.log(message.deliveryReceipts().toJSON()));
}

module.exports = sendSms;