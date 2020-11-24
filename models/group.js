'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Group.hasMany(models.Task)
      Group.belongsToMany(models.User, {
        through: 'GroupUsers',
        as: 'Users',
        foreignKey: 'GroupId'
      })
    }
  };
  Group.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'fill in the name field'
        },
        notNull: {
          msg: 'fill in the name field'
        }
      }
    },
    description: DataTypes.STRING,
    avatar: DataTypes.STRING,
    adminId: DataTypes.INTEGER,
    groupCode: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Group Code already exists'
      },      
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'fill in the Group Code field'
        },
        notNull: {
          msg: 'fill in the Group Code field'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};