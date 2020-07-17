const express = require('express');

const organizationController = require('../controllers/organization-controller.js');

const router = express();

router.get('/', organizationController.getOrganizationRootHandler);
router.post('/', organizationController.postOrganizationRootHandler);

module.exports = router;