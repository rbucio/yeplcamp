const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


// CAMPGROUND SCHEMA
mongoose.connect('mongodb://localhost/yelpCamp',{useMongoClient: true}, function() {
    console.log('Connection to database successful');
});

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model('Campground', campgroundSchema);


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
            res.render('campgrounds', {campgrounds: campgrounds});
        }
    });
});

app.post('/campgrounds', function(req, res) {

    // get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {
        name: name,
        image: image
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
    res.render('new')
});

app.listen(3000, function() {
    console.log('Yelpcamp Server is running!!!');
});
