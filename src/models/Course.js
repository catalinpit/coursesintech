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
        ref: 'User'
    },
}, {
    timestamps: true
});

CourseSchema.virtual('courseComments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'course'
});

CourseSchema.set('toObject', { virtuals: true });
CourseSchema.set('toJSON', { virtuals: true });

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;