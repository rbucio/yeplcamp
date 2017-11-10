const express = require('express');
const router = express();
const passport = require('passport');

// IMPORT MODEL
const User = require('../models/user');

//
// DISPLAY HOMEPAGE
//
router.get('/', function(req, res) {
    res.render('landing');
});

//
// SHOW REGISTER FORM
//
router.get('/register', function(req, res) {
    res.render('register');
});


//
// HANDLE USER REGISTRATION
//
router.post('/register', function(req, res) {

    // CREATE NEW USER OBJECT
    let newUser = new User({username: req.body.username});

    // USE PASSPORT REGIESTER METHOD TO REGISTER A NEW USER
    User.register(newUser, req.body.password, function(err, user) {
        // RENDER THE REGISTER FORM IF THERE IS AN ERROR
        if (err) {
            console.log(err);
            return res.render('register');
        }
        // IF NO ERROR LOGIN NEW USER AND REDIRECT TO CAMPGROUNDS PAGE
        passport.authenticate('local')(req, res, function(){
            res.redirect('/campgrounds');
        })
    });
});

//
// SHOW LOGIN FORM
//
router.get('/login', function(req, res) {
    res.render('login');
});

//
// HANDLE LOGIN LOGIC
//
router.post('/login', passport.authenticate('local',

    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }), function(req, res) {
});

//
// LOGOUT ROUTE
//
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/campgrounds');
});

// IS LOGGED IN MIDDLEWARE
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
