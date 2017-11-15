const mongoose = require('mongoose');


const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    createdBy: String,
    location: String,
    lat: Number,
    lng: Number,
    price: {
        type: String,
        default: ''
    },
    capacity: {
        type: String,
        default: ''
    },
    instructors: {
        type: String,
        default: ''
    },
    activities: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    website: {
        type: String,
        default: ''
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

module.exports = mongoose.model('Campground', campgroundSchema);
