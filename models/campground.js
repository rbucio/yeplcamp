const mongoose = require('mongoose');


const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    createdBy: String,
    location: String,
    lat: Number,
    lng: Number,
    price: String,
    activities: String,
    phone: String,
    website: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

module.exports = mongoose.model('Campground', campgroundSchema);
