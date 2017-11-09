const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const app = express();


// CONNECT TO DATABASE
mongoose.connect('mongodb://localhost/yelpCamp',{useMongoClient: true}, function() {
    console.log('Connection to database successful');
});

// REQUIRE MODELS
const Comment = require('./models/comment');
const Campground = require('./models/campground');
const User = require('./models/user')

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: 'Secret Key',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


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


// ================================
// AUTH ROUTES
// ================================


// SHOW REGISTER FORM
app.get('/register', function(req, res) {
    res.render('register');
});

// HANDLE USER REGISTRATION
app.post('/register', function(req, res) {

    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/campgrounds');
        })
    });
});

// SHOW LOGIN FORM
app.get('/login', function(req, res) {
    res.render('login');
});

// HANDLE LOGIN LOGIC
app.post('/login', passport.authenticate('local',
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }), function(req, res) {
});

// LOGOUT ROUTE
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/campgrounds');
});

app.listen(3000, function() {
    console.log('Yelpcamp Server is running!!!');
});
