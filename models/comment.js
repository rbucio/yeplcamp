const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: String,
    comment: String,
    campId: String
});

module.exports = mongoose.model('Comment', commentSchema);
