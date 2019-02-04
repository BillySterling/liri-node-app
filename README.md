# liri-node-app

Georgia Tech Coding Bootcamp week 10 **Node.js** assignment

## Overview

For this assignment, we created LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line Node.js app that takes in parameters and gives you back data.

## Packages Required:

We will use Axios to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api): [Axios](https://www.npmjs.com/package/axios)

A simple to use API library for the Spotify REST API: 
[Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

JavaScript date library for parsing, validating, manipulating, and formatting dates: 
[Moment](https://www.npmjs.com/package/moment)

Dotenv module that loads environment variables from a .env file (in this case, our Spotify API keys): 
[DotEnv](https://www.npmjs.com/package/dotenv)

Interactive Command Line User Interfaces:
[Inquirer](https://www.npmjs.com/package/inquirer)

## Installation

In order to run this application locally you will need to install the following npm packages (as referenced above):

* npm install axios
* npm install dotenv
* npm install node-spotify-api
* npm install moment
* npm install inquirer

The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

   * Step One: Visit <https://developer.spotify.com/my-applications/#!/>

   * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

   * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

   * Step Four: On the next screen, scroll down to where you see your client id and client secret. Record these values. 

   * Step Five: Using the Spotify keys from step 4, create a .env file at the projet root directory and add the values as follows:

        * SPOTIFY_ID=your-spotify-id
        * SPOTIFY_SECRET=your-spotify-secret

   * Refer to the `env-template.txt` file in the repository as an example.

## Usage

`node liri.js`

liri.js CLI will then offer one of the following four options:

1. `concert-this`

    *This will prompt the user for an artist or band and then search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:*

    * *Name of the venue*
    * *Venue location*
    * *Date of the Event*



2. `spotify-this-song`

    *This will prompt the user for a song name and will then show the following information about the song in your terminal/bash window:*

    * *Artist(s)*
    * *The song's name*
    * *A preview link of the song from Spotify (if available)*
    * *The album that the song is from*
    * *If no song is provided the program defaults to "The Sign" by Ace of Base.*



3. `movie-this`

    *This will prompt the user for a movie name and will output the following information to your terminal/bash window:*

    * *Title of the movie.*
    * *Year the movie came out.*
    * *IMDB Rating of the movie.*
    * *Rotten Tomatoes Rating of the movie.*
    * *Country where the movie was produced.*
    * *Language of the movie.*
    * *Plot of the movie.*
    * *Actors in the movie.*



4. `do-what-it-says`

    *This selection has no further options. Using the `fs` Node package, LIRI will take the text inside of file `random.txt` and then use it to call one of LIRI's commands.*

    *It should run `spotify-this-song` for "I Want it That Way," as read from the text in `random.txt`.*

    *Edit the text in `random.txt` to test out the feature for `movie-this` and `concert-this`.*

## Demo

A demo video of this assignment can be viewed [here](https://drive.google.com/file/d/1X-l7SZlw-d3SdG6MT8V3DByfbhmWHls7/view?usp=sharing)


An example log file of the output `log.txt` is provided in this repository.
