const mongoose = require('mongoose');
const validator = require('validator');

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        minglength: 20
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true,
        validate(val) {
            if (!validator.isURL(val)) {
                throw new Error('Invalid URL!');
            }
        }
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;