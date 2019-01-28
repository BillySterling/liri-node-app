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

// store the command
var option = process.argv[2];
console.log(option);
// Store all of the arguments in an array
var nodeArgs = process.argv;
// Create an empty variable for holding the search name
var searchVal = "";
// Loop through all the words in the node argument
//debugger;
for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      searchVal = searchVal + "+" + nodeArgs[i];
    }
    else {
      searchVal += nodeArgs[i];
  
    }
  }

console.log(searchVal);

    switch(option) {
        case "concert-this":
            concertThis(searchVal);
            break;
        case "spotify-this-song":
            spotifyThisSong(searchVal);
            break;
        case "movie-this":
            movieThis(searchVal);
            break;
        case "do-what-it-says":
            doWhatItSays(searchVal);
            break;
        default:
            console.log("*** INVALID INPUT***");
      };

function concertThis(searchVal) {
    var concertThisURL = "https://rest.bandsintown.com/artists/" + searchVal + "/events?app_id=codingbootcamp";
    //console.log(concertThisURL);
    axios.get(concertThisURL).then(
        function(response) {
        //console.log(response.data[0]);
        debugger;
        concertData = response.data;
        console.log("concert-this response for :"  + searchVal);
        for (var i = 0; i < concertData.length; i++) {
            console.log("Venue Name: " + response.data[i].venue.name);
            console.log("Venue Location: " + response.data[i].venue.city + " " + response.data[i].venue.region);
            var concertDate = moment(response.data[i].datetime).format('MM/DD/YYYY');
            console.log("Date: " + concertDate);
            };
        }
  )};

function spotifyThisSong(searchVal) {
    //console.log(searchVal);
    var spotify = new Spotify(keys.spotify);
    var songLimit = 3;
    //If no song is provided then default to "The Sign" by Ace of Base.
    if (!searchVal) {
        searchVal = "The Sign Ace of Base";
        songLimit = 1;
    }

    spotify.search({ type: 'track', query: searchVal, limit: songLimit})
    .then(function(response) {
      //console.log(response.tracks.items);
      songData = response.tracks.items;
      console.log("spotify-this-song response: ");
      for (var i = 0; i < songData.length; i++) {
        console.log("Artist: " + songData[i].artists[0].name);
        console.log("Song Name: " + songData[i].name);
        console.log("Preview: " + songData[i].preview_url);
        console.log("Album: " + songData[i].album.name);
      };
    })
    .catch(function(err) {
      console.log(err);
    });
}

function movieThis(searchVal) {
    if (!searchVal) {
        searchVal = "Mr. Nobody";
    }
    //run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + searchVal + "&type=movie&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);

    axios.get(queryUrl).then(
    function(response) {
        debugger;
        console.log("movie-this response: ");
        console.log("Title: " + response.data.Title);
        console.log("Actors: " + response.data.Actors);
        console.log("Year Released: " + response.data.Released);
        console.log("IMDB Rating: " + response.data.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    }
    );
}
