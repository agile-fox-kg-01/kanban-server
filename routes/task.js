const express = require('express');

const taskController = require('../controllers/task-controller.js');
const {authentication, authorization} = require('../middlewares/auth.js');

const router = express();

router.get('/', authentication, taskController.getTaskRootHandler);
router.post('/', authentication, taskController.postTaskRootHandler);
router.put('/:id', authentication, authorization, taskController.putTaskRootHandler);
router.delete('/:id', authentication, authorization, taskController.deleteTaskRootHandler);
    
module.exports = router;