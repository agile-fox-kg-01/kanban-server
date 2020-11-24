const express = require('express')
const router = express.Router()

const TaskController = require('../controllers/TaskController')

const { authentication, isOwner, isOwnedByGroup, isMemberGroup } = require('../middlewares/auth')

router.get('/', authentication, TaskController.browse)
router.get('/:id', authentication, isOwnedByGroup, TaskController.read)
router.put('/edit/:id', authentication, isOwner, TaskController.edit)
router.post('/add/:groupId', authentication, isMemberGroup, TaskController.add)
router.delete('/delete/:id', authentication, isOwner, TaskController.delete)
router.put('/change/:id', authentication, isOwner, TaskController.changeCategory)

module.exports = router