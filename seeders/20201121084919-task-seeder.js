'use strict';
const fs = require('fs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = JSON.parse(fs.readFileSync('./seeders/json/task.json', 'utf8'))
    data = data.map(temp => {
      temp.duedate = new Date()
      temp.createdAt = new Date()
      temp.updatedAt = new Date()
      return temp
    })
    await queryInterface.bulkInsert('Tasks', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
