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
    tags: {
        type: [String],
        required: true
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

// add methods to a schema by adding them on statics
CourseSchema.statics.getTags = function() {
    return this.aggregate([
        { $unwind: '$tags' },
        // group the tags and count them
        { $group: { _id: '$tags', count: { $sum: 1 } } },
        // sort in descending order
        { $sort: { count: -1 } }
    ]);
};

// relationship between courses and comments
CourseSchema.virtual('courseComments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'course'
});

CourseSchema.set('toObject', { virtuals: true });
CourseSchema.set('toJSON', { virtuals: true });

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;