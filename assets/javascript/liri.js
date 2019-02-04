// require .env file for global variables
require("dotenv").config();
const keys = require('./keys.js');
//require inquirer 
const inquirer = require('inquirer');
// require fs
const fs = require('fs');
// spotify required
var Spotify = require('node-spotify-api');
// assign process.argv to a variable
const axios = require('axios');
// require Moment
const moment = require('moment');
moment().format();

var command = process.argv[2];
var value = process.argv.slice(3).join(' ');


function spotted(){
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    spotify.search({
        type: "track",
        query: value,
        limit: "1"
    }, function (err, data) {
        if (data) {

            let artist = JSON.stringify(data.tracks.items[0].album.artists[0].name);
            let album = JSON.stringify(data.tracks.items[0].album.name);
            let previewURL = JSON.stringify(data.tracks.items[0].album.external_urls.spotify);
            console.log("ARTIST = " + artist);
            console.log("PREVIEW URL = " + previewURL);
            console.log("SONG NAME = " + value);
            console.log("ALBUM = " + album);

        } else {
            console.log("Error = " + err);
        }
    });
}

// BANDS IN TOWN Search Artist Venues
if (command === "concert-this") {

    inquirer.prompt([
        {
            name: "name",
            message: "Enter an Artist's name",
            type: "input"
        }
    ]).then(function (response) {
        let name = response.name;
        let queryStr = 'https://rest.bandsintown.com/artists/' + name + '/events?app_id=codingbootcamp';

        axios.get(queryStr)
            .then(function (response) {
                var dataObj = response.data;

                for (i = 0; i < 10; i++) {
                    console.log("Venue Name : " + dataObj[i].venue.name);
                    console.log("Venue location : " + dataObj[i].venue.city + ", " + dataObj[i].venue.region);
                    console.log("Date of event : " + (moment(dataObj[i].datetime).format('LLLL')));
                }

            }).catch(function (err) {
                console.log(err);
            });

    });

    // SPOTIFY Search Songs
} else if (command === "spotify-this-song") {
    
    spotted();

}
// OMDB Search Movie Titles
else if (command === "movie-this") {

    inquirer.prompt([
        {
            name: "name",
            message: "Enter a movie title you want to search...",
            type: "input"
        }
    ]).then(function (movieResponse) {
        var movieName = movieResponse.name;
        let omdbURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieResponse.name + "'";

        if (!movieName) {
            axios.get('http://www.omdbapi.com/?apikey=trilogy&t=Mr.Nobody')
                .then(function (response) {
                    var data = response.data;
                    // console.log(data);
                    console.log("Title: " + data.Title);
                    console.log("Year: " + data.Year);
                    console.log("IMDB Rating: " + JSON.stringify(data.Ratings[0]));
                    console.log("Rotten Tomato Rating: " + JSON.stringify(data.Ratings[1]));
                    console.log("Language: " + data.Language);
                    console.log("Plot: " + data.Plot);
                    console.log("Actors: " + data.Actors);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            axios.get(omdbURL)
                .then(function (response) {
                    var data = response.data;
                    console.log("Title: " + data.Title);
                    console.log("Year: " + data.Year);
                    console.log("IMDB Rating: " + JSON.stringify(data.Ratings[0]));
                    console.log("Rotten Tomato Rating: " + JSON.stringify(data.Ratings[1]));
                    console.log("Language: " + data.Language);
                    console.log("Plot: " + data.Plot);
                    console.log("Actors: " + data.Actors);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    })
}
// Pull a command and search criteria from RANDOM.TXT file
else if (command === "do-what-it-says") {

    var file = fs.readFileSync('../../random.txt', 'utf8');

    if (file.includes('spotify-this-song')) {
        var start_pos = file.indexOf('"') + 1;
        var end_pos = file.indexOf('"', start_pos);
        var getText = file.substring(start_pos,end_pos);

        command = 'spotify-this-song';
        value = getText;

        spotted();
    };


} else {
    console.log("Please enter a valid command");
}




