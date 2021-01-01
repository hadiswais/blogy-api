'use strict';

const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Users', [{

      name: 'Hadi Swais',
      email: 'hadi.swais@gmail.com',
      password: bcryptjs.hashSync('dev12345678', 10),
      role: 1,
      createdAt: new Date(),
      updatedAt: new Date()

    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
