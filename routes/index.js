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
    res.render('register', { page: 'register'});
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
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        // IF NO ERROR LOGIN NEW USER AND REDIRECT TO CAMPGROUNDS PAGE
        passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Welcome to YelpCamp ' + user.username);
            res.redirect('/campgrounds');
        })
    });
});

//
// SHOW LOGIN FORM
//
router.get('/login', function(req, res) {
    res.render('login', { page: 'login' });
});

//
// HANDLE LOGIN LOGIC
//
router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login',
        failureFlash: true,
        badRequestMessage: 'Credentials Dont Match',
        successFlash: 'Welcome Back to YelpCamp'
    }), function(req, res) {
});

//
// LOGOUT ROUTE
//
router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'You logged out!');
    res.redirect('/campgrounds');
});

module.exports = router;
