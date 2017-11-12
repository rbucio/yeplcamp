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
                    res.redirect('/campgrounds/' + camp._id);
                }
            });
        }
    });
});

//
// SHOW EDIT FORM
//
router.get('/campgrounds/:id/comments/:comment_id/edit', function(req, res) {
    // FIND COMMENT TO EDIT
    Comment.findById(req.params.comment_id, function(err, comment){
        if (err) {
            console.log(err);
        } else {
            res.render('comments/edit', { comment: comment, campgroundId: req.params.id });
        }
    });
});

// FIND COMMENT TO EDIT
// Comment.findByIdAndUp(req.params.comment_id, { comment: req.body.comment}, function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         res.render('comments/edit');
//     }
// });

// IS LOGGED IN MIDDLEWARE
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
