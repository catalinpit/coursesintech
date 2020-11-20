const Course = require('../models/Course')
const Comment = require('../models/Comment');

const addNewComment = async (req, res) => {
    const _id = req.params.id;
    
    try {
        const course = await Course.findById({ _id });

        const comment = new Comment({
            ...req.body,
            course
        });

        await comment.save();

        res.status(201).json({ course, comment });
    } catch(e) {
        console.log(e);
        res.status(500).json({ error: 'An error occurred' });
    }
};

const editComment = async (req, res) => {
    
};

const deleteComment = async (req, res) => {
    
};

module.exports = {
    addNewComment,
    editComment,
    deleteComment
};
