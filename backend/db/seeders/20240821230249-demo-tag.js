'use strict';

const { Tag } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Tag.bulkCreate([
      {
        userId: 1,
        name: 'Work'
      },
      {
        userId: 1,
        name: 'Personal'
      },
      {
        userId: 2,
        name: 'Travel'
      },
      {
        userId: 2,
        name: 'Cooking'
      },
      {
        userId: 3,
        name: 'Dance'
      },
      {
        userId: 3,
        name: 'Movies'
      },
      {
        userId: 4,
        name: 'Photography'
      },
      {
        userId: 4,
        name: 'Fashion'
      },
      {
        userId: 5,
        name: 'Music'
      },
      {
        userId: 5,
        name: 'Fitness'
      },
      {
        userId: 6,
        name: 'Business'
      },
      {
        userId: 6,
        name: 'Diary'
      },
      {
        userId: 7,
        name: 'Recipes'
      },
      {
        userId: 7,
        name: 'Travel'
      },
      {
        userId: 8,
        name: 'Study'
      },
      {
        userId: 8,
        name: 'Health'
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Tags';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: [
        'Work', 'Personal', 'Travel', 'Cooking', 'Dance', 'Movies', 'Photography', 
        'Fashion', 'Music', 'Fitness', 'Business', 'Diary', 'Recipes', 'Health', 'Study'
      ] }
    }, {});
  }
};
