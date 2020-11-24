const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const taskRouter = require('./task-router')
const groupRouter = require('./group-router')

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/login/google', UserController.oauthGoogle)
router.get('/browse', UserController.browse)

router.use('/task', taskRouter)
router.use('/group', groupRouter)

module.exports = router