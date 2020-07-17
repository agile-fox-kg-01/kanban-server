const express = require('express')
const router = express.Router()
const TaskController = require('../controller/task-controller.js')
const {authentication, authorization} = require('../middleware/auth.js')

router.get('/', authentication, TaskController.getUserTask)
router.post('/', authentication, TaskController.createTask)
router.get('/:id', authentication, authorization, TaskController.getTaskById)
router.put('/:id', authentication, authorization, TaskController.editTask)
router.delete('/:id', authentication, authorization, TaskController.deleteTask)

module.exports = router