const express = require('express');
const router = express();

// IMPORT MODEL
const Campground = require('../models/campground');

//
// SHOW ALL CAMPGROUNDS
//
router.get('/campgrounds', function(req, res) {
    // FIND ALL CAMPGROUNDS
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/campgrounds', {campgrounds: campgrounds});
        }
    });
});

//
// HANDLE CAMPGROUND CREATION
//
router.post('/campgrounds', isLoggedIn, function(req, res) {

    // STORE DATA FROM FORM
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;

    // NEW CAMPGROUND OBJECT
    let newCampground = {
        name: name,
        image: image,
        desc: description
    }

    // CREATE CAMPGROUND
    Campground.create(newCampground, function(err) {
        if (err) {
            console.log(err);
        } else {
            // REDIRECT TO CAMPGROUNDS PAGE
            res.redirect('/campgrounds');
        }
    })


});

//
// SHOW NEW CAMPGROUNDS FORM
//
router.get('/campgrounds/new', isLoggedIn, function(req, res) {
    res.render('campgrounds/new')
});

//
// DISPLAY INFO FOR PARTICULAR CAMPGROUND
//
router.get('/campgrounds/:id', function(req, res) {

    // FIND CAMPGROUND WITH THE ASSOCIATED ID AND POPULATE THE COMMENTS ARRAY
    Campground.findById(req.params.id).populate('comments').exec(function(err, camp) {

        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/show', {campground: camp});
        }

    });

});

// IS LOGGED IN MIDDLEWARE
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
