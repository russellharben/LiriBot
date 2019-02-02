// require .env file for global variables
require("dotenv").config();
const keys = require('./keys.js');

const axios = require('axios');
// assign process.argv to a variable
const command = process.argv[2];
const value = process.argv[3];

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });

  console.log(keys.spotify.id + " is id and " + keys.spotify.secret + " is secret");
   
  spotify
  .search({ type: 'artist', query: command })
  .then(function(response) {
    console.log("Successful Response = " + response);
  })
  .catch(function(err) {
    console.log(JSON.stringify(err.error));
  });

// bring in keys.js


// connect to spotify API
// const spotify = new Spotify(keys.spotify);
// console.log("Second console log " + spotify);


// function getMyBands(artist){

// }
// if(command === 'concert-this'){
//     getMyBands(value);
// }