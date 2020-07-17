const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const taskRouter = require('./task-router')

router.post('/login', UserController.login)
router.post('/register', UserController.register)

router.use('/task', taskRouter)

module.exports = router