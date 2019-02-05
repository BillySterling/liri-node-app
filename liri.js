// required npm packages
require("dotenv").config();
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require('moment');
// Load the NPM Package inquirer
var inquirer = require("inquirer");
moment().format();
// file system builtin
var fs = require('fs');
var option = ""; 
var searchVal = "";

// Add the code required to import the `keys.js` file and store it in a variable.
var keys = require("./keys.js");
// log file
var logText = "";

userOption();

function userOption () {
    inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "Which LIRI Function Do You Want?",
            choices: ["concert-this","spotify-this-song","movie-this","do-what-it-says"]
        }
    ]).then(function(choice) {  
        option = choice.option;
        if (option !== "do-what-it-says") {
            // if NOT option "do-what-it-says" then prompt the user to input a search string
            inquirer.prompt([
                {
                    type: "input",
                    name: "search",
                    message: "Enter Your Desired Search"
            }]).then(function(response) { 
                // remove spaces, concatenate search string with "+" value
                searchVal = response.search.replace(" ", "+");
                getInput(option,searchVal);  
            });   
        } else {
            // the "do-what-it-says" option has no additional search parameter
            getInput(option);  
        }
    });
};

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
            doWhatItSays();
            break;
        default:
            logText = "*** INVALID INPUT *** \n\n";
            logResponse(logText);
    }; 
};

function concertThis(searchVal) {
    if (searchVal !== "") {
        var concertThisURL = "https://rest.bandsintown.com/artists/" + searchVal + "/events?app_id=codingbootcamp";
        // remove the '+' characters for display
        var dispVal = searchVal.replace(/\+/g, ' ');
        logText = ("\n*********************************************************\n");
        logText = logText + "concert-this response for: "  + dispVal + "\n";
        logText = logText + ("*********************************************************\n\n");
        axios.get(concertThisURL).then(
            function(response) {
            concertData = response.data;
            if (!Array.isArray(concertData) || !concertData.length) {
                logText = "\nNo concerts scheduled for " + dispVal + "\n";
                } else {
                concertData.forEach(concert => {
                    var concertDate = moment(concert.datetime).format('MM/DD/YYYY');
                    logText = logText + "Venue Name: " + concert.venue.name + "\n" +          
                    "Venue Location: " + concert.venue.city + " " + concert.venue.region + "\n" +
                    "Date: " + concertDate + "\n\n";
                    });
                }
            console.log(logText);
            logResponse(logText);
            reRun();
            }
        );
    } else { 
        logText = "\nNo artist or band entered for search\n";
        console.log(logText);
        logResponse(logText);
        reRun();
        };
};

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
        logText = ("\n*********************************************************\n");
        logText = logText + "spotify-this-song response for: "  + dispVal + "\n";
        logText = logText + ("*********************************************************\n\n");
        if (!Array.isArray(songData) || !songData.length) {
            logText = "\nNo song data for " + dispVal + "\n";
            } else {
            songData.forEach(song => {
                logText = logText + "Artist: " + song.artists[0].name + "\n" +
                "Song Name: " + song.name + "\n" +
                "Preview: " + song.preview_url + "\n" +
                "Album: " + song.album.name + "\n\n";
                });
            }
    console.log(logText);
    logResponse(logText);
    reRun();
    })
    .catch(function(err) {
    console.log(err);
    logResponse(err);
    });
};

function movieThis(searchVal) {
    if (!searchVal) {
        searchVal = "Mr. Nobody";
    }
    //run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + searchVal + "&type=movie&y=&plot=short&apikey=trilogy";
    // remove the '+' characters for display
    var dispVal = searchVal.replace(/\+/g, ' ');
    logText = ("\n*********************************************************\n");
    logText = logText + "movie-this response for: "  + dispVal + "\n";
    logText = logText + ("*********************************************************\n\n");

    axios.get(queryUrl).then(
    function(response) {
        if (response.data.Response === "True") {
            logText = logText + "Title: " + response.data.Title + "\n" +
            "Actors: " + response.data.Actors + "\n" +
            "Year Released: " + response.data.Released + "\n" +
            "IMDB Rating: " + response.data.Ratings[0].Value + "\n" +
            "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n\n";
            } else {
                logText = "\nNo movie data found\n";
            }
        console.log(logText);
        logResponse(logText);
        reRun();
        }
    );
};

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
        option = dataArr[0];
        searchVal = dataArr[1];
        // remove extra double quotes
        searchVal = searchVal.replace(/\"/g, '');
        // call the main input process with the values from the file
        getInput(option,searchVal);
    });
};

//option to search again or exit
function reRun() {
    inquirer.prompt([
        {
        type: "list",
        message: "Search again or exit?",
        choices: ["Search", "Exit"],
        name: "again"
        }
    ]).then(function(response) {
        var answer = response.again;
        if (answer === "Search") {
            userOption();
        }
        else {
            logText = "\nThank you - goodbye\n";
            console.log(logText);
            logResponse(logText);
        }
    });
};

function logResponse(logText) {
    // append the text into the "log.txt" file.
    // If the file didn't exist, then it gets created on the fly.
    fs.appendFile("log.txt", logText, function(err) {  
        // If an error was experienced we will log it.
        if (err) {
            console.log(err);
        } else {
            // clear out the log file before next input processes
            logText = "";
        }
    });
logText = "";    
};