const express = require('express')
const router = express.Router()

const GroupController = require('../controllers/GroupController')

const { authentication, isOwner, isOwnedByGroup, isMemberGroup } = require('../middlewares/auth')

router.get('/', authentication, GroupController.browse)
router.get('/:groupId', authentication, isMemberGroup, GroupController.read)
router.post('/add', authentication, GroupController.add)
router.post('/join', authentication, GroupController.join)
router.delete('/out/:groupId', authentication, GroupController.out)
router.delete('/delete/:groupId', authentication, GroupController.delete)

module.exports = router