const express = require('express');

const userController = require('../controllers/user-controller.js');

const router = express();

router.post('/', userController.postUserRegisterHandler);

module.exports = router;