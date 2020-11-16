const express = require('express');
const auth = require('.././middleware/auth');
const Course = require('../models/Course')
const router = new express.Router();

router.get('/', async (req, res) => {
    let order;

    if (req.query.sortBy) {
        order = req.query.sortBy.split('=')[0].toLowerCase() === 'asc' ? 1 : -1;
    }

    try {
        const courses = await Course.find({ }).sort({
            createdAt: order
        });

        res.render('index', { courses });
    } catch(e) {
        res.status(500).send();
    }
});

router.post('/courses', auth, async (req, res) => {
    const course = new Course({
        ...req.body,
        owner: req.user._id
    });

    try {
        await course.save();

        res.status(201).send(course);
    } catch(e) {
        res.status(400).send(e);
    }
});

router.get('/courses/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const course = await Course.findOne({ _id })

        if (!course) {
            return res.send(404).send();
        }

        res.render('course', { course });
    } catch(e) {
        res.status(500).send(e);
    }
});

router.patch('/courses/:id', auth, async (req, res) => {
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

        res.send(course);
    } catch(e) {
        res.status(500).send(e);
    }
});

router.delete('/courses/:id', auth, async (req, res) => {
    try {
        const course = await Course.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

        if (!course) {
            res.status(400).send();
        }

        res.send(course);
    } catch(e) {
        res.status(500).send(e);
    }
});

module.exports = router;