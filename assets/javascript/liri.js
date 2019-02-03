// require .env file for global variables
require("dotenv").config();
const keys = require('./keys.js');
// require fs
const fs = require('fs');
// spotify required
var Spotify = require('node-spotify-api');
// assign process.argv to a variable
const axios = require('axios');

const command = process.argv[2];
const value = process.argv.slice(3).join(' ');

// return 10 upcoming venues for bands //
if (command === "concert-this") {
    let queryStr = 'https://rest.bandsintown.com/artists/' + value + '/events?app_id=codingbootcamp';

    axios.get(queryStr)
        .then(function (response) {
            var dataObj = response.data;
            
            console.log(dataObj[0].id);
            for(i = 0; i < 10; i++){
                console.log("Venue Name : " + dataObj[i].venue.name);
                console.log("Venue location : " + dataObj[i].venue.city + ", " + dataObj[i].venue.region);
                console.log("Date of event : " + dataObj[i].datetime);
            }

        }).catch(function (err) {
            console.log(err);
        });

} else if (command === "spotify-this-song") { // spotify search
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    spotify
        .search({ type: 'track', query: value })
        .then(function (response) {
            
            var tracks = response;
            console.log(tracks);
            console.log(typeof response);

        })
        .catch(function (err) {
            console.log(JSON.stringify(err.error));
        });

} else if (command === "movie-this") {

    let omdbURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + value + "'";

    if(!value){
        axios.get('http://www.omdbapi.com/?apikey=trilogy&t=Mr.Nobody')
        .then(function (response) {
            var data  = response.data;
            console.log(data);
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
            var data  = response.data;
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


} else if (command === "do-what-it-says") {
    var text = fs.readFileSync('../../random.txt', 'utf8');
    console.log(text);
// ????

} else {
    console.log("Please enter a valid command");
} 




