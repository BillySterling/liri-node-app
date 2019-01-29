// required npm packages
require("dotenv").config();
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require('moment');
moment().format();
// file system builtin
var fs = require('fs'); 

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

getInput(option,searchVal);

function getInput(option,searchVal) {
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
};

function concertThis(searchVal) {
    var concertThisURL = "https://rest.bandsintown.com/artists/" + searchVal + "/events?app_id=codingbootcamp";
    //console.log(concertThisURL);
    axios.get(concertThisURL).then(
        function(response) {
        //console.log(response.data[0]);
        //debugger;
        concertData = response.data;
        console.log("concert-this response for :"  + searchVal);
        concertData.forEach(concert => {
            console.log("Venue Name: " + concert.venue.name);
            console.log("Venue Location: " + concert.venue.city + " " + concert.venue.region);
            var concertDate = moment(concert.datetime).format('MM/DD/YYYY');
            console.log("Date: " + concertDate);
            });
        }
  )}; 

function spotifyThisSong(searchVal) {
    //console.log(searchVal);
    var spotify = new Spotify(keys.spotify);
    var songLimit = 20;
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
      songData.forEach(song => {
        console.log("Artist: " + song.artists[0].name);
        console.log("Song Name: " + song.name);
        console.log("Preview: " + song.preview_url);
        console.log("Album: " + song.album.name);
      });
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
    //console.log(queryUrl);

    axios.get(queryUrl).then(
    function(response) {
        console.log("movie-this response: ");
        console.log("Title: " + response.data.Title);
        console.log("Actors: " + response.data.Actors);
        console.log("Year Released: " + response.data.Released);
        console.log("IMDB Rating: " + response.data.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    }
    );
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
        return console.log(error);
        }    
        // We will then print the contents of data
        console.log(data);
        // create array from file
        var dataArr = data.split(',');   
        //console.log("data: " + data);
        option = dataArr[0];
        searchVal = dataArr[1];
        // remove extra double quotes
        searchVal = searchVal.replace(/\"/g, '');
        // call the main input process with the values from the file
        getInput(option,searchVal);
    });
};