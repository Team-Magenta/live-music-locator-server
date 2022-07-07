'use strict';
const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({

    image: { type: String, required: true },
    venue: { type: String, required: true },
    artist: { type: String, required: true },
    date: { type: String, required: true }

});

const eventModel = mongoose.model('Events', eventSchema);

module.exports = eventModel;
