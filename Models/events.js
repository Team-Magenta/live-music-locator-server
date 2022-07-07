'use strict';
const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({


    artist: { type: String, required: true },
    image: { type: String, required: true },
    venue: { type: Array, required: true },
    attended: {type: Boolean, default: false, required: false},
    date: { type: String, required: true}

});

const eventModel = mongoose.model('Events', eventSchema);

module.exports = eventModel;
