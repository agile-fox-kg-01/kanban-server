'use strict';

const fs = require('fs')
const { hashPassword } = require('../helpers/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = JSON.parse(fs.readFileSync('user.json', 'utf8'))
    data = data.map(temp => {
      temp.password = hashPassword(temp.password)
      temp.organization = 'Hacktiv8'
      temp.createdAt = new Date()
      temp.updatedAt = new Date()
      return temp
    })
   await queryInterface.bulkInsert('Users', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
