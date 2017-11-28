const mongoose = require('mongoose');


const campgroundSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    image: String,
    desc: {
        type: String,
        required: [true, 'Description is required']
    },
    createdBy: String,
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    lat: Number,
    lng: Number,
    price: {
        type: String,
        required: [true, 'Price is required']
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
        required: [true, 'A phone number is required']
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
