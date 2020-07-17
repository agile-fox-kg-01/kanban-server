const express = require('express')
const router = express.Router()
const users = require('./users.js')
const tasks = require('./tasks.js')


router.use('/', users)
router.use('/', tasks)
module.exports = router