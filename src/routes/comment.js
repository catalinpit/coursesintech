const express = require('express');
const auth = require('.././middleware/auth');
const commentController = require('../controllers/comment');
const router = new express.Router();

router.post('/courses/:id/comments', auth, commentController.addNewComment);
router.patch('/courses/:id/comments/:comment_id', auth, commentController.editComment);
router.delete('/courses/:id/comments/:comment_id', auth, commentController.deleteComment);

module.exports = router;