var keys = require("./keys.js");
//console.log(keys);
// var twitterKeys = {
//   consumer_key: "ANrn5JV57XppSLzl7BhIIuvEu",
//   consumer_secret: "Kd85d9lUDrWZYfA2OAmnxK7GOmEN1rdzjcSAJbthdJk9nO2p4g",
//   access_token_key: "786594535631572993-sE8Fg0wRNJnjsHokFGECvU1DmqNqiYN",
//   access_token_secret: "s0inGs3zMt9Xb3OVk34zKPWnqRwptopS9ZitopHC85aJf"
// }
var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: keys.consumer_key ,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret
});
 

var action = process.argv[2];
var value = process.argv[3];

switch(action){
	case "my-tweets":
		console.log("You have selected the twitter option");
		var params = {screen_name: 'kingbainz'};
		client.get('statuses/user_timeline', params, function(error, tweets, response){
		  if (!error){
		    //console.log(tweets);
		    for(var i = 0; i <tweets.length; i++){
		    	console.log(tweets[i].text)
		    }
		  }
		});
		break;

	case "spotify-this-song":
		//spotify stuff
		console.log("You have selected the spotify option");
		console.log("the song you have selected is: " + value);
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



