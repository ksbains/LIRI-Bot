var keys = require("./keys.js");

//console.log(keys);

var action = process.argv[2];
var value = process.argv[3];

switch(action){
	case "my-tweets":
		//tweetsstuff
		console.log("You have selected the twitter option");
		break;
	case "spotify-this-song":
		//spotify stuff
		console.log("You have selected the spotify option");
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



