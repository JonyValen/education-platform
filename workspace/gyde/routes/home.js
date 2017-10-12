var express = require("express");
var router = express.Router({mergeParams: true});


router.get("/", isLoggedIn, function(req, res){
    res.render("home/index");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

module.exports = router;