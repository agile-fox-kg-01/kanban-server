const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/tasks.js')
const { authentication, authorization } = require('../middlewares/auth.js')

router.get('/tasks', authentication, TaskController.findAll)
router.post('/tasks', authentication, TaskController.create)
router.put('/tasks/:id', authentication, authorization, TaskController.edit)
router.delete('/tasks/:id', authentication, authorization, TaskController.delete)
router.patch('/tasks/:id', authentication, TaskController.editCategory)


module.exports = router