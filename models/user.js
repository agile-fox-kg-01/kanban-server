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
      User.hasMany(models.Comment)
      User.belongsToMany(models.Group, {
        through: 'GroupUsers',
        as: 'Groups',
        foreignKey: 'UserId'
      })
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Username already exists'
      },      
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'fill in the username field'
        },
        notNull: {
          msg: 'fill in the username field'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'fill in the email field'
        },
        notNull: {
          msg: 'fill in the email field'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'fill in the password field'
        },
        notNull: {
          msg: 'fill in the password field'
        }
      }
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    birthOfDate: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: 'birth of date must be a date type'
        }
      }
    },
    avatar: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};