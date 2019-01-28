// required npm packages
var axios = require("axios");
var moment = require('moment');
moment().format();
require("dotenv").config();

// Add the code required to import the `keys.js` file and store it in a variable.
var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);
//axious npm fa-pulse


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
    console.log(concertThisURL);
axios.get(concertThisURL).then(
  function(response) {
    console.log(response.data);
  }
)};
