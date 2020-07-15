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
      type : DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate:{
        isEmail : {
          args: true,
          msg: 'Format field nya harus email'
        },
        notEmpty: {
          args: true,
          msg: 'Field Password wajib diisi'
        },
        notNull: {
          msg: 'Please enter your email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 16],
          msg: 'Password length more than 8 and less than 16'
        },
        notEmpty: {
          args: true,
          msg: 'Field Password wajib diisi'
        },
        
      }
    }
  }, {
    hooks : {
      beforeCreate : (user) => {
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};