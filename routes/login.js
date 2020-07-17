const express = require('express');

const userController = require('../controllers/user-controller.js');

const router = express();

router.post('/', userController.postUserLoginHandler);
router.post('/google', userController.postGoogleLoginHandler);

module.exports = router;