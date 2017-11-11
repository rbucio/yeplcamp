const mongoose = require('mongoose');


const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    createdBy: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

module.exports = mongoose.model('Campground', campgroundSchema);
