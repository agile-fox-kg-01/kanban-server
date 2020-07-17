const { Organization } = require('../models/index.js');

class OrganizationController {
    static async getOrganizationRootHandler(req, res, next) {
        try {
            const organizations = await Organization.findAll();

            res.status(200).json({organizations});
        } catch (error) {
            next(error);
        }
    }

    static async postOrganizationRootHandler(req, res, next) {
        const newOrg = {
            name: req.body.name
        };

        try {
            const organization = await Organization.create(newOrg);
            
            res.status(201).json(organization);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = OrganizationController;