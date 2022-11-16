require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL
const sendSms = require('./sms');
const {Schema} = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/Messages');
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        console.log(names);
        module.exports.Collection = names;
    });
});

const messageSchema = new Schema({
    phoneNumber: String,
    message: String,
    date_time: String
});
const Message = mongoose.model('Message', messageSchema);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const PORT = 3000;

app.post('/sms', async (req, res) => {
    const { phoneNumber, message } = req.body;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric',
        minute: 'numeric', second: 'numeric' };
    const date_time = new Date().toLocaleDateString('en-US', options);
    const params = new Message({
        phoneNumber,
        message,
        date_time
    });
    await params.save(function(err,result){
        if (err){
            console.log(err);
        }
        else{
            console.log(result)
        }
    });
    sendSms(phoneNumber, message);
    res.status(201).send({
        message: 'New SMS sent. Kindly check your phone',
        data: params
    })
});

app.get('/sms/history', async (req, res) => {
    const result = await Message.find({}, {_id: 0}, { versionKey: 0 }).exec();
    res.status(200).send(result);
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;