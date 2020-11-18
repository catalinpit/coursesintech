const express = require('express');
const auth = require('.././middleware/auth');
const userController = require('../controllers/user');
const router = express.Router();

router.get('/users/me', auth, userController.getCurrentUserProfile);
router.get('/users/:name', userController.getUser);
router.post('/users', userController.createUser);
router.post('/users/login', userController.login);
router.post('/users/logout', auth, userController.logout);
router.post('/users/logoutAll', userController.logoutAll);
router.patch('/users/me', auth, userController.updateUser);
router.delete('/users/me', auth, userController.deleteUser);

module.exports = router;