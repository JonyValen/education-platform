var mongoose = require('mongoose');
var Post = require('./post');
const Schema = mongoose.Schema;

var iChars = "~`!#$%^&*+=-[]\\\';,/{}|\":<>?";

var userSchema = new Schema({
    firstName : {
        type: String,
        required: true
    },
    middleName : {
        type: String
    },
    lastName : {
        type: String,
        required: true
    },
    userName : {
    	type: String,
    	validate: {
            validator: (userName) => userName.length > 2,
            message: 'Username must be longer than 2 characters.'
    	},
    	required: true
    },
    password : {
    	type: String,
    	validate : {
    		validator: (password) => password.length >= 9 && password.match(/\d+/g) != null 
    		&& str.match(/[a-z]/i) != null && iChars.match(/\W/g) != ""
    	},
    	required: true
    },
    DOB : {
    	day: {
           type: Number,
           required: true
    	},
    	month: {
           type: Number,
           required: true
    	},
    	year: {
           type: Number,
           required: true
    	}
    },
    address : {
    	buildingNum: {
           type: Number,
           required: true
    	},
    	streetName: {
           type: String,
           required: true
    	},
    	city: {
           type: String,
           required: true
    	},
    	region: {
           type: String,
           required: true
    	},
    	country: {
           type: String,
           required: true
    	},
    	zipCode: {
           type: Number,
           required: true
    	}
    },
    email: {
    	type: String,
    	required: true
    },
    posts: [Post],
    linkedin: String

});


const User = mongoose.model('User', UserSchema);

module.exports = User;
