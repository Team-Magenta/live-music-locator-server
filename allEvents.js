'use strict';

const axios = require('axios');

async function getAllEvents(req, res) {
    try {
        let { location } = req.query;
        let cityUrl = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city=${location}&classificationName=music&apikey=${process.env.TM_API_KEY}`;
        let newLocation = await axios.get(cityUrl);
        // console.log('newLocation: ', newLocation);
        let eventsArray = newLocation.data._embedded.events.map(event => new Events (event));
        // console.log('eventsArray: ', eventsArray);
        res.status(200).send(eventsArray);
    } catch (error) {
        res.send(error);
    }
}



class Events {
    constructor(eventObj) {
        this.artist = eventObj.name;
        this.date = eventObj.dates.start.localDate;
        this.image = eventObj.images[0].url;
        this.venue = eventObj._embedded.venues;
        // this.attractions = eventObj._embedded.attractions;
    }
}

module.exports = getAllEvents;

// console.log('getting here');
//url.com/?artist=adele&location=seattle&venue=shobox
// artist, location, venue

// console.log({ artist, venue });

// TODO: 
// VENUE URL WORKING
// NEED TO GET ATTRACTIONS URL WORKING
// TO TEST COMMENT OUT VENUE URL AND START CONSOLE LOGGING ATTRACTIONSS URL BLOCK
// REMOVE VENUE ID FROM EVENTS URL TO TEST ATTRACTIONS URL







// constructor(events) {
//         this.name = events.name;
//         this.dateTime = events.dates.start.dateTime;
//         this.images = events.images[0];
//         this.venues = events._embedded.venues;
//         this.attractions = events._embedded.attractions;
//}

// console.log(newLocation);


// let attractionsUrl = `https://app.ticketmaster.com/discovery/v2/attractions.json?countryCode=US&keyword=${artist}&classificationName=music&apikey=${process.env.TM_API_KEY}`;
// let attractions = await axios.get(attractionsUrl);
// // console.log(attractions.data._embedded.attractions);
// const attractionId = attractions.data._embedded.attractions[0].id;

// let venueUrl = `https://app.ticketmaster.com/discovery/v2/venues.json?countryCode=US&keyword=${venue}&includeSpellcheck=yes&apikey=${process.env.TM_API_KEY}`;
// let venueResponse = await axios.get(venueUrl);
// // console.log(venueResponse.data._embedded.venues);
// // console.log(attractions.data._embedded.attractions);
// const venueId = venueResponse.data._embedded.venues[0].id;
// console.log(venueId);

// let eventsUrl = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&venueId=${venueId}&classificationName=music&apikey=${process.env.TM_API_KEY}`;
// let events = await axios.get(eventsUrl);
// console.log(events.data._embedded.events, 'this is lien 10 api call');



// let selectedCountry = events.data._embedded.events.map(singleEvent => {
//     return new Event(singleEvent);
// });
