'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    let data = [{
      name: 'Shingo Aoi',
      email: 'shingoaoi@mail.com',
      password: '$2a$07$2yGKwOiohFUUm3F8RUyNIO0T/0Gb3V2OL/jjXxUOlgCAK/iq.eSrG',
      OrganizationId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }];

    await queryInterface.bulkInsert('Users', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', data);
  }
};
