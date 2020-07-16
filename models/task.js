'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User)
    }
  };
  Task.init({
    name: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Field Title Cannot Be Empty!'
        },
        notNull:{
          msg: 'Field Title Null!'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull : false,

      validate: {
        isIn: {
          args: [['backlog', 'todo', 'doing', 'done']],
          msg: 'Must be in backlog, todo, doing, done. '
        },
        notEmpty: {
          args: true,
          msg: 'Field Description Cannot Be Empty'
        },
        notNull:{
          msg: 'Field Category Null!'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};