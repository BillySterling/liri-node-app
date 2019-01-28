// required npm packages
require("dotenv").config();
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require('moment');
moment().format();
// file system builtin
let fs = require('fs'); 

// Add the code required to import the `keys.js` file and store it in a variable.
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
console.log(spotify);


var option = process.argv[2];
console.log(option);
var key = process.argv[3];
console.log(key);

if (option === "concert-this") {
    concertThis(key)
};

function concertThis(key) {
    console.log(key);
    var concertThisURL = "https://rest.bandsintown.com/artists/" + key + "/events?app_id=codingbootcamp";
    //console.log(concertThisURL);
axios.get(concertThisURL).then(
  function(response) {
    //console.log(response.data[0]);
    console.log("concert-this response: ");
    console.log("Venue Name: " + response.data[0].venue.name);
    console.log("Venue Location: " + response.data[0].venue.city + " " + response.data[0].venue.region);
    var concertDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
    console.log("Date: " + concertDate);
  }
  )};
