'use strict';
const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema ({

  name: {type: String, required: true},
  image: {type: String, required: true},
  location: {type: String, required: true},
  venue: {type: String, required: true}

});

const eventModel = mongoose.model('Events', eventSchema);

module.exports = eventModel;
