var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var passportLocalMongooseEmail = require('passport-local-mongoose-email');

var studentSchema = mongoose.Schema({
    first: String,
    last: String,
    dob: String,
    address: String,
    phone: Number,
    email: String,
    password: String,
    gender: String,
    role: String
});

studentSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Student", studentSchema);