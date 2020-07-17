'use strict';
const {
  Model
} = require('sequelize');
const OrganizationController = require('../controllers/organization-controller');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organization.hasMany(models.User);
    }
  };
  Organization.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};