// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = 'AC39df28d29c055f877b7f9adf1feef38a';
const authToken = '0fc88fec591cfc337881ad3328205be6';
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