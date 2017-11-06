//READMEJONNY!
//To run test.js enter "node test.js" in the terminal,
//while in the came directory as test.js.


//Import and require mongoose library/module.
var mongoose = require('mongoose');

//Connect to default port 27017.
var db = mongoose.connect('mongodb://127.0.0.1:27017/test');

//Test connection.
mongoose.connection.once('connected', function() {
	console.log("Connection Successful.")
});