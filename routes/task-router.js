const express = require('express')
const router = express.Router()

const TaskController = require('../controllers/TaskController')

const { authentication, isOwner } = require('../middlewares/auth')

router.get('/', authentication, TaskController.browse)
router.get('/:id', authentication, TaskController.read)
router.put('/edit/:id', authentication, isOwner, TaskController.edit)
router.post('/add', authentication, TaskController.add)
router.delete('/delete/:id', authentication, isOwner, TaskController.delete)
router.put('/change/:id', authentication, isOwner, TaskController.changeCategory)

module.exports = router