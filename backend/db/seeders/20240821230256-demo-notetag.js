'use strict';

const { NoteTag } = require('../models');

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
    await NoteTag.bulkCreate([
      // User 1's Notes with Tags
      { noteId: 1, tagId: 1 }, // Project Plan with Work
      { noteId: 2, tagId: 1 }, // Meeting Notes with Work
      { noteId: 3, tagId: 2 }, // Grocery List with Personal
      { noteId: 4, tagId: 2 }, // Weekend Plans with Personal

      // User 2's Notes with Tags
      { noteId: 7, tagId: 3 }, // Flight Details with Travel
      { noteId: 8, tagId: 3 }, // Accommodation with Travel
      { noteId: 9, tagId: 4 }, // Recipe Ideas with Cooking
      { noteId: 10, tagId: 4 }, // Grocery List with Cooking

      // User 3's Notes with Tags
      { noteId: 13, tagId: 5 }, // Choreography Ideas with Dance
      { noteId: 14, tagId: 5 }, // Dance Practices with Dance
      { noteId: 17, tagId: 6 }, // Movie Ideas with Movies
      { noteId: 18, tagId: 6 }, // Script Notes with Movies

      // User 4's Notes with Tags
      { noteId: 19, tagId: 7 }, // Photo Locations with Photography
      { noteId: 20, tagId: 7 }, // Camera Settings with Photography
      { noteId: 21, tagId: 8 }, // Fashion Sketches with Fashion
      { noteId: 22, tagId: 8 }, // Color Palettes with Fashion

      // User 5's Notes with Tags
      { noteId: 25, tagId: 9 }, // Lyrics Ideas with Music
      { noteId: 26, tagId: 9 }, // Melodies with Music
      { noteId: 27, tagId: 10 }, // Workout Plan with Fitness
      { noteId: 28, tagId: 10 }, // Nutrition Plan with Fitness

      // User 6's Notes with Tags
      { noteId: 31, tagId: 11 }, // Rap Lyrics with Business
      { noteId: 32, tagId: 11 }, // Flow Patterns with Business
      { noteId: 33, tagId: 12 }, // Daily Diary with Diary
      { noteId: 34, tagId: 12 }, // Dream Journal with Diary

      // User 7's Notes with Tags
      { noteId: 37, tagId: 13 }, // Dance Practice with Recipes
      { noteId: 38, tagId: 13 }, // Choreography Notes with Recipes
      { noteId: 39, tagId: 14 }, // Recipe Collection with Travel
      { noteId: 40, tagId: 14 }, // Cooking Tips with Travel

      // User 8's Notes with Tags
      { noteId: 43, tagId: 15 }, // Practice Log with Study
      { noteId: 44, tagId: 15 }, // Song Covers with Study
      { noteId: 45, tagId: 16 }, // Workout Routine with Health
      { noteId: 46, tagId: 16 }, // Nutrition Journal with Health
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'NoteTags';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      noteId: { [Op.in]: [1, 2, 3, 4, 7, 8, 9, 10, 13, 14, 17, 18, 19, 20, 21, 22, 25, 26, 27, 28, 31, 32, 33, 34, 37, 38, 39, 40, 43, 44, 45, 46] },
      tagId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] }
    }, {});
  }
};
