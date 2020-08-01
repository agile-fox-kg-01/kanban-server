const express = require('express')
const router = express.Router()

const userRoutes = require('./user')
const taskRoutes = require('./task')

router.get('/', (req,res) => {
    res.send("Hello , This Is Rest Api My Kanban Ichlasul")
})

router.use('/users', userRoutes)
router.use('/tasks', taskRoutes)

module.exports = router