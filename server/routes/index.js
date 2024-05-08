const express = require('express');
const controller = require('../controllers/index');
const {auth } = require('../middleware');
const router = express.Router();

router.get('/', auth, controller.authorizerUser);
router.post('/signin', controller.validateUser);
router.post('/signup', controller.addUser);
router.get('/registrations', controller.getTotalRegistrations);
router.post('/register', auth, controller.registerUser);
router.post('/donate');
router.get('/user', auth, controller.getUser);
router.get('/user/registrations', auth, controller.getRegistrations);
router.post('/user/update', auth, controller.updateUser);

module.exports = router;

