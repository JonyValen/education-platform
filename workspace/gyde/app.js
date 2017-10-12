var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var local = require("passport-local");
var Student = require("./models/students");
var passportLocalMongooseEmail = require('passport-local-mongoose-email');

var indexRoutes = require("./routes/index");
var homeRoute = require("./routes/home");

mongoose.connect("mongodb://localhost/gyde", {useMongoClient: true});



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started");
});


app.use(require("express-session")({
    secret:"ready to go",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new local({
    usernameField: 'email',
  },Student.authenticate()));
passport.serializeUser(Student.serializeUser());
passport.deserializeUser(Student.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use("/home", homeRoute);