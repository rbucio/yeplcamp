const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {
    let campgrounds = [
        { name: 'Rough Trails', image: 'https://images.unsplash.com/photo-1479244209311-71e35c910f59?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D' },
        { name: 'King of the Hill', image: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D' },
        { name: 'Springfields', image: 'https://images.unsplash.com/photo-1485216983937-749292830fcf?auto=format&fit=crop&w=1374&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D' },
        { name: 'Nowhere Creek', image: 'https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D' },
        { name: 'La Loma Hills', image: 'https://images.unsplash.com/photo-1499363536502-87642509e31b?auto=format&fit=crop&w=634&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D' },
        { name: 'River Dale Camp', image: 'https://images.unsplash.com/photo-1500581276021-a4bbcd0050c5?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D' }
    ];
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.listen(3000, function() {
    console.log('Yelpcamp Server is running!!!');
});
