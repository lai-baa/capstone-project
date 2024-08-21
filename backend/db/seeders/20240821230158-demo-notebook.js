'use strict';

const { Notebook } = require('../models');

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
    await Notebook.bulkCreate([
      {
        ownerId: 1,
        name: 'Work',
        favorite: true,
      },
      {
        ownerId: 1,
        name: 'Personal',
        favorite: false,
      },
      {
        ownerId: 1,
        name: 'Music',
        favorite: false,
      },
      {
        ownerId: 2,
        name: 'Travel',
        favorite: true,
      },
      {
        ownerId: 2,
        name: 'Cooking',
        favorite: false,
      },
      {
        ownerId: 2,
        name: 'Workout',
        favorite: false,
      },
      {
        ownerId: 3,
        name: 'Dance',
        favorite: true,
      },
      {
        ownerId: 3,
        name: 'Game Strategies',
        favorite: false,
      },
      {
        ownerId: 3,
        name: 'Movie Ideas',
        favorite: false,
      },
      {
        ownerId: 4,
        name: 'Photography Notes',
        favorite: true,
      },
      {
        ownerId: 4,
        name: 'Fashion Sketches',
        favorite: false,
      },
      {
        ownerId: 4,
        name: 'Study ',
        favorite: false,
      },
      {
        ownerId: 5,
        name: 'Song Lyrics',
        favorite: true,
      },
      {
        ownerId: 5,
        name: 'Fitness Routine',
        favorite: false,
      },
      {
        ownerId: 5,
        name: 'Travel Journal',
        favorite: false,
      },
      {
        ownerId: 6,
        name: 'Rap Lyrics',
        favorite: true,
      },
      {
        ownerId: 6,
        name: 'Business Plans',
        favorite: false,
      },
      {
        ownerId: 6,
        name: 'Diary',
        favorite: false,
      },
      {
        ownerId: 7,
        name: 'Dance Notes',
        favorite: true,
      },
      {
        ownerId: 7,
        name: 'Recipes',
        favorite: false,
      },
      {
        ownerId: 7,
        name: 'Travel Ideas',
        favorite: false,
      },
      {
        ownerId: 8,
        name: 'Music Practice',
        favorite: true,
      },
      {
        ownerId: 8,
        name: 'Workout Plans',
        favorite: false,
      },
      {
        ownerId: 8,
        name: 'Study Notes',
        favorite: false,
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Notebooks';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: [
        'Work', 'Personal', 'Music', 'Travel', 'Cooking', 'Workout',
        'Dance', 'Game Strategies', 'Movie Ideas', 'Photography Notes',
        'Fashion Sketches', 'Study', 'Song Lyrics', 'Fitness Routine',
        'Travel Journal', 'Rap Lyrics', 'Business Plans', 'Diary',
        'Dance Notes', 'Recipes', 'Travel Ideas', 'Music Practice',
        'Workout Plans', 'Study Notes'
      ] }
    }, {});
  }
};
