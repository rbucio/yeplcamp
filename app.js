const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');
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

// GENERAL MIDDLEWARE
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());

// LOCAL VARIABLES
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

// SET VIEW ENGINE
app.set('view engine', 'ejs');

// IMPORT ROUTES
let campgroundsRoutes = require('./routes/campgrounds');
let commentsRoutes = require('./routes/comments');
let authRoutes = require('./routes/index');

// USER ROUTES
app.use(campgroundsRoutes);
app.use(commentsRoutes);
app.use(authRoutes);


// ESTABLISH A SERVER CONNECTION
app.listen(3000, function() {
    console.log('Yelpcamp Server is running!!!');
});
