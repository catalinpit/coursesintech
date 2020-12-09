const express = require('express');
const courseController = require('../controllers/course');
const auth = require('.././middleware/auth');
const router = new express.Router();

router.get('/', courseController.getCourses);
router.post('/courses', auth, courseController.addCourse);
router.get('/courses/:id', courseController.getCourse);
router.patch('/courses/:id', auth, courseController.updateCourse);
router.delete('/courses/:id', auth, courseController.deleteCourse);
router.get('/tags', courseController.getCoursesByTag);
router.get('/tags/:tag', courseController.getCoursesByTag);

module.exports = router;