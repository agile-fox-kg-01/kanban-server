const express = require('express')
const router = express.Router()

const TaskController = require('../controllers/taskController')
const { authentication, isOwner} = require('../midlewares/auth')
router.post('/', authentication, TaskController.postTask)
router.get('/' , authentication, TaskController.getTask)
router.get('/:id', authentication, isOwner, TaskController.getTaskById)
router.put('/:id', authentication, isOwner, TaskController.putTaskById)
router.delete('/:id', authentication, isOwner, TaskController.deleteTaskById)

module.exports = router