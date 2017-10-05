// Twitter Stuff
var keys = require("./keys.js");
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: keys.consumer_key ,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret
});
//Fs
var fs = require("fs");
// Spotify Stuff
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: "b1adb519b7d94a65ba45fab2d8e0acd0",
  secret: "ad55a14b45164bfbac0c9da2499f5d60"
});
//OMDB api
var request = require('request');


//Functions
function readAll(arr, start){
	var movieName = "";
	for(var i = start; i < arr.length; i++){
		if(i === start){
		movieName = movieName + arr[i];
		}else{movieName = movieName + " " + arr[i];}
	}
	return movieName;
}

function toQueryString(search) {
	var queryString = {
	    t: search,
	    type: "movie",
	    //r: "JSON",
	    plot:"short",
	    apikey:"40e9cece&"
	};
    var baseUrl = "http://www.omdbapi.com/?"
    var qString = '';
    for (var i in queryString) {
        qString += '&' + i + '=' + queryString[i];
    }
    return baseUrl + qString.trim('&');
};
function main(arr, start, isFirst){
	//Input Variables
	var action = arr[start];
	var value = arr[start+1];
	switch(action){
		case "my-tweets":
			//console.log("You have selected the twitter option");
			// This will show your last 20 tweets and when they were created at in your terminal/bash window.
			var params = {screen_name: 'kingbainz'};
			client.get('statuses/user_timeline', params, function(error, tweets, response){
			  if (!error){
			    for(var i = 0; i <tweets.length; i++){
			    	console.log("Created at: " + tweets[i].created_at);
			    	console.log("Tweet: " + tweets[i].text)
			    	console.log("");
			    }
			  }else{console.log(error)}
			});
			break;

		case "spotify-this-song":
			//spotify stuff
			//console.log("You have selected the spotify option");
			if(isFirst){
				value = readAll(process.argv, 3);
				if(value.length ===0){
					console.log("the value you enterd is not valid, defaut search activated");
					value = "The Sign";
				}
			}
			console.log("the song you entered is: " + value);
			spotify.search({ type: 'track', query: value }, function(err, data) {
			if (err) {
				return console.log('Error occurred: ' + err);
			} 
			console.log("The artist is: ");
			console.log(data.tracks.items[0].album.artists[0].name);
			console.log("The song's name is: ");
			console.log(data.tracks.items[0].name);
			console.log("The album is: ");
			console.log(data.tracks.items[0].album.name);
			console.log("The link is: ")
			console.log(data.tracks.items[0].external_urls.spotify);	
			});
			break;

		case "movie-this":
			//console.log("You have selected the movie option");
			if(isFirst){
				value = readAll(process.argv, 3);
				if(value.length ===0){
					console.log("the value you enterd is not valid, defaut search activated");
					value = "Mr. Nobody";
				}
			}
			console.log("the movie you entered is: " + value);
			request(toQueryString(value).trim(), function(error, response, body) {
			//console.log("The url is: " + toQueryString(readAll(process.argv, 3)).trim());
			// If the request was successful...
				if (!error && response.statusCode === 200) {
				    // Then log the body from the site!
				    console.log("The Title is: " + JSON.parse(body).Title);
				    console.log("The Year is: " + JSON.parse(body).Year);
				   	console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
				   	console.log("The " + JSON.parse(body).Ratings[0].Source + " Rating is: " + JSON.parse(body).Ratings[0].Value);
				   	console.log("The Country is: " + JSON.parse(body).Country);
				   	console.log("The Language is: " + JSON.parse(body).Language);
				   	console.log("The Plot is: " + JSON.parse(body).Plot);
				   	console.log("The Actors are: " + JSON.parse(body).Actors);
			  	}else{
			  		console.log(error);
			  }
			});
			break;
		case "do-what-it-says":
			//do stuff
			//console.log("You have selected the doStuff option");
			fs.readFile("random.txt", "utf8", function(error, data){
				if(error){
					return console.log(error);
				}
			var dataArr = data.split(",");
			// for(var i = 0; i < dataArr.length; i++){
			// 	console.log(dataArr[i].trim());
			// }
			main(dataArr, 0, false);
			});
			break;
		default:
			console.log("You in the default son");
			break;
	}
}
main(process.argv, 2, true);



