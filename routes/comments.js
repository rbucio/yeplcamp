const express = require('express');
const router = express();

// IMPORT MODELS
const Campground = require('../models/campground');
const Comment = require('../models/comment');

//
// SHOW COMMENTS FORM
//
router.get('/campgrounds/:id/comments/new', isLoggedIn, function(req, res) {

    // FIND CAMPGROUND TO ASSOCIATE COMMENT FORM TO
    Campground.findById(req.params.id, function(err, camp) {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', {campground: camp});
        }
    });

});

//
// HANDLE COMMENT CREATION
//
router.post('/campgrounds/:id/comments', isLoggedIn, function(req, res) {

    // FIND CAMPGROUND
    Campground.findById(req.params.id, function(err, camp) {
        if (err) {
            console.log(err);
        } else {

            // STORE FORM INFO
            let name = req.user.username;
            let comment = req.body.comment;
            let campId = req.params.id;
            let newComment = { name: name, comment: comment, campId: campId };

            // CREATE NEW COMMENT
            Comment.create(newComment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // PUSH COMMENT INTO ASSOCIATED CAMPGROUND AND REDIRECT
                    camp.comments.push(comment);
                    camp.save();
                    req.flash('success', 'Comment Added Successfully');
                    res.redirect('/campgrounds/' + camp._id);
                }
            });
        }
    });
});

//
// SHOW EDIT FORM
//
router.get('/campgrounds/:id/comments/:comment_id/edit', isLoggedIn, function(req, res) {
    // FIND COMMENT TO EDIT
    Comment.findById(req.params.comment_id, function(err, comment){
        if (err) {
            console.log(err);
        } else {
            res.render('comments/edit', { comment: comment, campgroundId: req.params.id });
        }
    });
});

//
// HANDLE UPDATING COMMENT
//
router.post('/campgrounds/:id/comments/:comment_id', isLoggedIn, function(req, res) {
    // FIND AND EDIT COMMENT
    Comment.findByIdAndUpdate(req.params.comment_id, { comment: req.body.comment}, function(err) {
        if (err) {
            console.log(err);
        } else {
            req.flash('success', 'Comment Edited Successfully');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

//
// DELETE COMMENT
//
router.get('/campgrounds/:id/comments/:comment_id/delete', isLoggedIn, function(req, res) {

    // FIND AND DELETE
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            console.log(err);
        } else {
            req.flash('success', 'Comment Deleted');
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
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
