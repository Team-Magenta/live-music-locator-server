'use strict';

const axios = require('axios');

async function getAllEvents(req, res) {
    console.log('getting here');
    //url.com/?artist=adele&location=seattle&venue=shobox
    // artist, location, venue

    let { artist, venue } = req.query;
    console.log({ artist, venue });

    // let attractionsUrl = `https://app.ticketmaster.com/discovery/v2/attractions.json?countryCode=US&keyword=${artist}&classificationName=music&apikey=${process.env.TM_API_KEY}`;
    // let attractions = await axios.get(attractionsUrl);
    // // console.log(attractions.data._embedded.attractions);
    // const attractionId = attractions.data._embedded.attractions[0].id;

    let venueUrl = `https://app.ticketmaster.com/discovery/v2/venues.json?countryCode=US&keyword=${venue}&includeSpellcheck=yes&apikey=${process.env.TM_API_KEY}`;
    let venueResponse = await axios.get(venueUrl);
    console.log(venueResponse.data._embedded.venues);
    // console.log(attractions.data._embedded.attractions);
    const venueId = venueResponse.data._embedded.venues[0].id;
    console.log(venueId);

    let eventsUrl = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&venueId=${venueId}&classificationName=music&apikey=${process.env.TM_API_KEY}`;
    let events = await axios.get(eventsUrl);
    console.log(events.data._embedded.events, 'this is lien 10 api call');



    let selectedCountry = events.data._embedded.events.map(singleEvent => {
        return new Event(singleEvent);
    });
    res.send(selectedCountry);

}

class Event {
    constructor(events) {
        this.name = events.name;
        this.dateTime = events.dates.start.dateTime;
        this.images = events.images[0];
        // console.log(events._embedded);
        this.venues = events._embedded.venues;
        this.attractions = events._embedded.attractions;
        // this.description = events.weather.description;
    }
}

module.exports = getAllEvents;


