const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {
    let campgrounds = [
        { name: 'Rough Trails', image: '' },
        { name: 'King of the Hill', image: '' },
        { name: 'Springfields', image: '' },
        { name: 'Nowhere Creek', image: '' },
        { name: 'La Loma Hills', image: '' },
        { name: 'River Dale Camp', image: '' }
    ];
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.listen(3000, function() {
    console.log('Yelpcamp Server is running!!!');
});
