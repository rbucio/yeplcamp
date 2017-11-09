const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


// CONNECT TO DATABASE
mongoose.connect('mongodb://localhost/yelpCamp',{useMongoClient: true}, function() {
    console.log('Connection to database successful');
});

// REQUIRE MODELS
const Comment = require('./models/comment');
const Campground = require('./models/campground');


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {
    // GET ALL CAMPGROUNDS
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/campgrounds', {campgrounds: campgrounds});
        }
    });
});

app.post('/campgrounds', function(req, res) {

    // GET DATA FROM FORM
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
            // redirect back to campgrounds
            res.redirect('/campgrounds');
        }
    })


});

app.get('/campgrounds/new', function(req, res) {
    res.render('campgrounds/new')
});

app.get('/campgrounds/:id', function(req, res) {

    Campground.findById(req.params.id).populate('comments').exec(function(err, camp) {

        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/show', {campground: camp});
        }

    });

});
// ============================
// COMMENTS ROUTES
// ============================
app.get('/campgrounds/:id/comments/new', function(req, res) {

    Campground.findById(req.params.id, function(err, camp) {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', {campground: camp});
        }
    });

});

app.post('/campgrounds/:id/comments', function(req, res) {
    Campground.findById(req.params.id, function(err, camp) {
        if (err) {
            console.log(err);
        } else {

            let name = req.body.name;
            let comment = req.body.comment;
            let newComment = { name: name, comment: comment };

            Comment.create(newComment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    camp.comments.push(comment);
                    camp.save();
                    res.redirect('/campgrounds/' + camp._id);
                }
            });
        }
    });
});

app.listen(3000, function() {
    console.log('Yelpcamp Server is running!!!');
});
