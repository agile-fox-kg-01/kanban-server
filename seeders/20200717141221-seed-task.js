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
        title: 'Kanban app server',
        category: 'Backlog',
        UserId: 1,
        createdAt = new Date(),
        updatedAt = new Date()
      }];

      await queryInterface.bulkInsert('Tasks', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Tasks', null);
  }
};
