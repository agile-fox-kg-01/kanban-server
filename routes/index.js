const express = require('express');

const organization = require('./organization.js');
const login = require('./login.js');
const register = require('./register.js');
const task = require('./task.js');

const router = express();

router.use('/organization', organization);
router.use('/login', login);
router.use('/register', register);
router.use('/tasks', task);

module.exports = router;