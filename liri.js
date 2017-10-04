// Twitter Stuff
var keys = require("./keys.js");
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: keys.consumer_key ,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret
});
// Spotify Stuff
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: "b1adb519b7d94a65ba45fab2d8e0acd0",
  secret: "ad55a14b45164bfbac0c9da2499f5d60"
});
//Input Variables
var action = process.argv[2];
var value = process.argv[3];
//Functions
function readAll(arr, start){
	var movieName = "";
	for(var i = start; i < arr.length; i++){
		movieName = movieName + " " + arr[i];
	}
	return movieName;
}

function toQueryString(value) {
	var queryString = {
	    t: value,
	    type: "movie",
	    r: "JSON"
	};
    var baseUrl = "http://www.omdbapi.com/?apikey=40e9cece&"
    var qString = '';
    for (var i in queryString) {
        qString += '&' + i + '=' + this.queryString[i];
    }
    return baseUrl + qString.trim('&');
};

switch(action){
	case "my-tweets":
		console.log("You have selected the twitter option");
		// This will show your last 20 tweets and when they were created at in your terminal/bash window.
		var params = {screen_name: 'kingbainz'};
		client.get('statuses/user_timeline', params, function(error, tweets, response){
		  if (!error){
		    console.log(tweets);
		    for(var i = 0; i <tweets.length; i++){
		    	//console.log(tweets[i].text)
		    }
		  }
		});
		break;

	case "spotify-this-song":
		//spotify stuff
		console.log("You have selected the spotify option");
		value = readAll(process.argv, 3);
		console.log("the song you have selected is: " + value);
		spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  } 
		console.log(data); 
			console.log(data.tracks.items[0]);
			//.album.artist[0].name);
		});

		// need to console log 
		// Artist(s)
		// The song's name
		// A preview link of the song from Spotify
		// The album that the song is from
		break;

	case "movie-this":
		//movie stuff
		console.log("You have selected the movie option");
		break;
	case "do-what-it-says":
		//do stuff
		console.log("You have selected the doStuff option");
		break;
	default:
		console.log("You in the default son");
		break;
}



