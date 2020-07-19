const express = require('express')
const router = express.Router()
const UserController = require('../controllers/users.js')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/login/google', UserController.googleLogin)

module.exports = router