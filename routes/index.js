const express = require('express')
const router = express.Router()
const UserRouter = require('./user-route.js')
const TaskRouter = require('./task-route.js')

router.use('/user', UserRouter)
router.use('/task', TaskRouter)

module.exports = router