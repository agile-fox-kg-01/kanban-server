'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/passHandler.js')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Task)
    }
  };
  User.init({
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'fullname field must be filled'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "please fill with email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "please fill password field"
        }
      }
    },
    organization: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPass(user.password)
        user.organization = "Hacktiv8"
      }

    },
    sequelize,
    modelName: 'User',
  });
  return User;
};