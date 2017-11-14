const express = require('express');
const router = express();

// IMPORT MODEL
const Campground = require('../models/campground');
const Comment = require('../models/comment');

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

    // NEW CAMPGROUND OBJECT
    let newCampground = {
        name: req.body.name,
        image: req.body.image,
        desc: req.body.description,
        createdBy: req.user.username,
        price: req.body.price,
        capacity: req.body.capacity,
        instructors: req.body.instructors,
        activities: req.body.activities,
        phone: req.body.phone,
        website: req.body.website
    }

    // CREATE CAMPGROUND
    Campground.create(newCampground, function(err) {
        if (err) {
            console.log(err);
        } else {
            // REDIRECT TO CAMPGROUNDS PAGE
            req.flash('success', 'Campground Created!!')
            res.redirect('/campgrounds');
        }
    });
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

//
// DISPLAY FORM WITH DATA OF CAMPGROUND TO EDIT
//
router.get('/campgrounds/:id/edit', isLoggedIn, function(req, res) {

    // FIND CAMPGROUND TO EDIT
    Campground.findById(req.params.id, function(err, camp) {

        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/edit', { campground: camp });
        }
    });
});

//
// HANDLE UPDATE LOGIC
//
router.post('/campgrounds/:id', isLoggedIn, function(req, res) {

    let data = {
        name: req.body.name,
        image: req.body.image,
        desc: req.body.description
    }

    Campground.findByIdAndUpdate(req.params.id, data, function(err) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            req.flash('success', 'Campground Updated Successfully');
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
});

//
// DESTROY CAMPGROUND
//
router.get('/campgrounds/:id/delete', isLoggedIn, function(req, res) {

    // FIND CAMPGROUND TO DESTROY FROM DB
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {

            // DELETE ALL COMMENTS FOR DELETED CAMPGROUND
            Comment.find({campId: req.params.id}).remove(function (err) {
                if (err) {
                    console.log(err);
                } else {
                    req.flash('success', 'Campground Deleted!')
                    res.redirect('/campgrounds');
                }
            });
        }
    });
});

// IS LOGGED IN MIDDLEWARE
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You must be logged in to do that');
    res.redirect('/login');
}

module.exports = router;
