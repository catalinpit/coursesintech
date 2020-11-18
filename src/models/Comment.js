const mongoose = require('mongoose');

const CommentSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        username: String
    }
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;