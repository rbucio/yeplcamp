const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: String,
    comment: String,
    campId: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);
