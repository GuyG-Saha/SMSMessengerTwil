const express = require('express');
const bodyParser = require('body-parser');
const sendSms = require('./sms');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const port = 3000;

const messageHistory = [];

// Create user endpoint
app.post('/sms', (req, res) => {
    const { phoneNumber, message } = req.body;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric',
        minute: 'numeric', second: 'numeric' };
    const date_time = new Date().toLocaleDateString('en-US', options);
    const params = {
        phoneNumber,
        message,
        date_time
    };

    messageHistory.push(params);

    sendSms(phoneNumber, message);

    res.status(201).send({
        message: 'New SMS sent. Kindly check your phone',
        data: params
    })
});

app.get('/sms/history', (req, res) => {
    res.status(200).send(messageHistory);
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;