'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/bcrypt')

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
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        },
        notNull: {
          msg: 'fill in the email field'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'fill in the password field'
        }
      }
    },
    organization: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
        user.organization = 'Hacktiv8'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};