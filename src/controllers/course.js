const Course = require('../models/Course')
const Comment = require('../models/Comment');

const getCourses = async (req, res) => {
    let order;

    if (req.query.sortBy) {
        order = req.query.sortBy.split('=')[0].toLowerCase() === 'asc' ? 1 : -1;
    }

    try {
        const courses = await Course.find()
            .populate('owner courseComments')
            .sort({
                createdAt: order
            });

        res.json({
            courses: courses
        });
    } catch(e) {
        console.log(e)
        res.status(500).send(e);
    }
};

const addCourse = async (req, res) => {
    const course = new Course({
        ...req.body,
        owner: req.user._id
    });

    try {
        await course.save();

        res.status(201).json({ course });
    } catch(e) {
        res.status(400).send(e);
    }
};

const getCourse = async (req, res) => {
    const _id = req.params.id;

    try {
        const course = await Course.findOne({ _id })
            .populate({ path: 'courseComments', model: Comment });

        if (!course) {
            return res.send(404).send();
        }

        res.json({ 
            course
        });
    } catch(e) {
        res.status(500).send(e);
    }
};

const updateCourse = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'author']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.send(400).send({ error: 'Invalid operation' });
    }

    try {
        const course = await Course.findOne({ _id: req.params.id, owner: req.user._id })
        updates.forEach((update) => course[update] = req.body[update]);

        await course.save();

        if (!course) {
            return res.status(404).send();
        }

        res.json({ course });
    } catch(e) {
        res.status(500).send(e);
    }
};

const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

        if (!course) {
            res.status(400).send();
        }

        res.send(course);
    } catch(e) {
        res.status(500).send(e);
    }
};

const getCoursesByTag = async (req, res) => {
    try {
        const tagURL = req.params.tag;
        const tagQuery = tagURL || { $exists: true };
        const tagsPromise = Course.getTags();
        const coursesPromise = Course.find({ tags: tagQuery });

        const [tags, courses] = Promise.all([tagsPromise, coursesPromise]);

        res.json(tagURL, tags, stores);
    } catch(e) {
        res.status(500).send(e);
    }
}

module.exports = {
    getCourses,
    addCourse,
    getCourse,
    updateCourse,
    deleteCourse,
    getCoursesByTag
};