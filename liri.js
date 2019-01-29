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
// log file
var logText = "";

// store the command
var option = process.argv[2];
console.log(option);
// Store all of the arguments in an array
var nodeArgs = process.argv;
// Create an empty variable for holding the search name
var searchVal = "";
// Loop through all the words in the node argument
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      searchVal = searchVal + "+" + nodeArgs[i];
    }
    else {
      searchVal += nodeArgs[i];
    }
  }

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
            logText = "*** INVALID INPUT *** \n\n";
            console.log(logText);
            logResponse(logText);
    };
};

function concertThis(searchVal) {
    var concertThisURL = "https://rest.bandsintown.com/artists/" + searchVal + "/events?app_id=codingbootcamp";
    // remove the '+' characters for display
    var dispVal = searchVal.replace(/\+/g, ' ');
    logText = "concert-this response for: "  + dispVal + "\n\n";
    axios.get(concertThisURL).then(
        function(response) {
        debugger;
        concertData = response.data;
        concertData.forEach(concert => {
            var concertDate = moment(concert.datetime).format('MM/DD/YYYY');
            logText = logText + "Venue Name: " + concert.venue.name + "\n" +          
            "Venue Location: " + concert.venue.city + " " + concert.venue.region + "\n" +
            "Date: " + concertDate + "\n\n";
            });
        console.log(logText);
        logResponse(logText);
        }
  )}; 

function spotifyThisSong(searchVal) {
    var spotify = new Spotify(keys.spotify);
    var songLimit = 20;
    //If no song is provided then default to "The Sign" by Ace of Base.
    if (!searchVal) {
        searchVal = "The Sign Ace of Base";
        songLimit = 1;
    }

    spotify.search({ type: 'track', query: searchVal, limit: songLimit})
    .then(function(response) {
        songData = response.tracks.items;
        // remove the '+' characters for display
        var dispVal = searchVal.replace(/\+/g, ' ');
        logText = "spotify-this-song response for: "  + dispVal + "\n\n";
        songData.forEach(song => {
            logText = logText + "Artist: " + song.artists[0].name + "\n" +
            "Song Name: " + song.name + "\n" +
            "Preview: " + song.preview_url + "\n" +
            "Album: " + song.album.name + "\n\n";
        });
      console.log(logText);
      logResponse(logText);
    })
    .catch(function(err) {
      console.log(err);
      logResponse(err);
    });
}

function movieThis(searchVal) {
    if (!searchVal) {
        searchVal = "Mr. Nobody";
    }
    //run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + searchVal + "&type=movie&y=&plot=short&apikey=trilogy";
    // remove the '+' characters for display
    var dispVal = searchVal.replace(/\+/g, ' ');
    logText = "movie-this response for: "  + dispVal + "\n\n";

    axios.get(queryUrl).then(
    function(response) {
        logText = logText + "Title: " + response.data.Title + "\n" +
        "Actors: " + response.data.Actors + "\n" +
        "Year Released: " + response.data.Released + "\n" +
        "IMDB Rating: " + response.data.Ratings[0].Value + "\n" +
        "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n\n";
        console.log(logText);
        logResponse(logText);
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

function logResponse(logText) {
    // append the text into the "log.txt" file.
    // If the file didn't exist, then it gets created on the fly.
    fs.appendFile("log.txt", logText, function(err) {  
        // If an error was experienced we will log it.
        if (err) {
          console.log(err);
        }
    });
    // clear out the log file before next input ptocesses
    logText = "";
};
  