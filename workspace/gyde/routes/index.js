var express = require("express");
var router = express.Router();
var passport = require("passport");
var Student = require("../models/students");



//root route
router.get("/", function(req, res){
    res.render("root");
});

//register
router.get("/register", function(req, res){
    res.render("root");
});


router.post("/register", function(req, res){
    var first = req.body.first;
    var last = req.body.last;
    var dob = req.body.month + "/" + req.body.day + "/" + req.body.year;
    var address = req.body.address;
    console.log(req.body);
    var phone = Number(req.body.phone);
    var email = req.body.email;
    var password = req.body.password;
    var gender = req.body.gender;
    var role = req.body.role;

    Student.register(new Student({username: req.body.email }), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("root");
        }
    
        var newStudent = {
            first: first,
            last: last,
            dob: dob,
            address: address,
            phone: phone,
            email: email,
            password: password,
            gender: gender,
            role: role
        };
        
        Student.create(newStudent, function(err, newStudent){
            if(err){
                console.log(err);
            }else{
                newStudent.save();
                res.redirect("/home");
            }
        });
        
        passport.authenticate("local")(req, res, function(){
            res.redirect("/home");
        });
    });
});

//login
router.get("/login", function(req, res){
    res.render("root");
});
router.post("/login", passport.authenticate("local", {successRedirect: "/home", failureRedirect: "/"}), function(req, res){
    Student.register(new Student({username: req.body.email}), req.body.password, function(err, user){
        if(err){
            console.log("something went wrong");
            return res.render("root");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/home");
        });
        
     });
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}


module.exports = router;