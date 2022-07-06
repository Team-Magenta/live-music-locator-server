'use strict';

const axios = require('axios');

async function handleApiCall(req, res) {

  //   let searchQueryEvent = req.query.searchQueryEvent;
  let url = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=${process.env.TM_API_KEY}`;
  let events = await axios.get(url);
  console.log(events,'this is lien 10 api call');
  let selectedCountry = events.data.data.map(singleEvent => {
    return new Event(singleEvent);
  });
  res.send(selectedCountry);

}

class Event {
  constructor(events) {
    this.date = events.venueId;
    // this.description = events.weather.description;
  }
}

module.exports = handleApiCall;

// https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=zs2Ar6APA5XABu7FKADTgJpJARiTa1fZ
