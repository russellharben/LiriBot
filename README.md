# LiriBot

LIRI Bot is a basic interactive program that accepts commands from the user in order to search the inter-webz for the desired (hopefully) results.

# How does LIRI work

Once open, LIRI runs off of the command line and expects one of the following commands:

1. spotify-this-song
2. concert-this
3. movie-this
4. do-what-it-says

Command format: node liri.js <command> <search criteria>
Example: node liri.js spotify-this-song renegade
  
If you forget to enter a search criteria, LIRI might still prompt the user for some information.

These commands are taken and using OMDB/Spotify/BandsInTown API's, goes out and searches the appropriate database and returns a few pieces of information about the thing you're searching for.
     
# Author(s)

Russell H.
