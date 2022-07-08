'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Events = require('./Models/events.js');
const getAllEvents = require('./allEvents');
// const verifyUser = require('./auth');

const mongoose = require('mongoose');

// connect mongoose

mongoose.connect(`${process.env.DB_URL}`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Mongoose is connected');
});

const app = express();
app.use(cors());
app.use(express.json());

app.cors = express();

const PORT = process.env.PORT || 3002;


app.get('/events', getEvents);
//this endpoint hits database
app.get('/allEvents', getAllEvents);
//this endpoint hits api
app.post('/events', postEvent);
app.delete('/events/:id', deleteEvent);

async function getEvents(req, res, next) {

    try {
        let results = await Events.find();
        res.status(200).send(results);
    } catch (err) {
        next(err);
    }
}
//this is for adding to 'my events'
// async function handleApiCall(req, res, next) {

//     try {
//         let results = await events.find();
//         res.status(200).send(results);
//     } catch (err) {
//         next(err);
//     }
// }



async function postEvent(req, res, next) {
    try {
        let createEvent = await Events.create(req.body);
        res.status(200).send(createEvent);
    } catch (err) {
        next(err);
    }
}


async function deleteEvent(req, res, next) {
    let id = req.params.id;
    try {
        await Events.findByIdAndDelete(id);
        res.status(200).send('item deleted');
    } catch (err) {
        next(err);
    }
}

app.put('/events/:id', async (req, res) => {
    const { artist, image, venue, date, attended } = req.body;
    const updatedEvent = await Events.findByIdAndUpdate(req.params.id, { artist, image, venue, date, attended }, { new: true, overwrite: true });
    res.send(updatedEvent);
});

app.get('/', (req, res) => {
    res.send('Welcome to our page');
});

app.get('*', (req, res) => {
    res.status(404).send('Content not available');
});



app.listen(PORT, () => console.log(`listening on ${PORT}`));














// https://app.ticketmaster.com/discovery/v2/events.json?apikey=zs2Ar6APA5XABu7FKADTgJpJARiTa1fZ
// zs2Ar6APA5XABu7FKADTgJpJARiTa1fZ

// https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?album_type=SINGLE&offset=20&limit=10
// 61e0f9347e1d4ffa9ddf8b5a7b6354f4
