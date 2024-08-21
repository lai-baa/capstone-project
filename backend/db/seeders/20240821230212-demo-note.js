'use strict';

const { Note } = require('../models');

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
    await Note.bulkCreate([
      {
        ownerId: 1,
        notebookId: 1,
        title: 'Project Plan',
        description: 'Outline the project phases: research, design, development, testing, and deployment.',
      },
      {
        ownerId: 1,
        notebookId: 1,
        title: 'Meeting Notes',
        description: 'Discussed the project timeline, assigned tasks, and set the next meeting for Friday.',
      },
      // Notes for User 1, Notebook 2
      {
        ownerId: 1,
        notebookId: 2,
        title: 'Grocery List',
        description: 'Milk, eggs, butter, bread, chicken, rice, vegetables, pasta, cheese, and coffee.',
      },
      {
        ownerId: 1,
        notebookId: 2,
        title: 'Weekend Plans',
        description: 'Visit the museum, lunch with friends, and finish reading the new novel.',
      },
      // Notes for User 1, Notebook 3
      {
        ownerId: 1,
        notebookId: 3,
        title: 'Song Ideas',
        description: 'Incorporate a soft piano intro, followed by a catchy chorus with upbeat rhythm.',
      },
      {
        ownerId: 1,
        notebookId: 3,
        title: 'Chord Progressions',
        description: 'Experiment with C-G-Am-F and G-D-Em-C for the bridge.',
      },
      // Notes for User 2, Notebook 4
      {
        ownerId: 2,
        notebookId: 4,
        title: 'Flight Details',
        description: 'Flight 5678 on March 15th, departs at 10:30 AM, arrives at 2:00 PM. Seat 12A.',
      },
      {
        ownerId: 2,
        notebookId: 4,
        title: 'Accommodation',
        description: 'Stay at Grand Hotel, room 405, check-in at 3:00 PM, check-out on March 20th.',
      },
      // Notes for User 2, Notebook 5
      {
        ownerId: 2,
        notebookId: 5,
        title: 'Recipe Ideas',
        description: 'Try out the new chocolate cake recipe, and experiment with vegan pasta dishes.',
      },
      {
        ownerId: 2,
        notebookId: 5,
        title: 'Grocery List',
        description: 'Flour, sugar, cocoa powder, avocados, spinach, tomatoes, and pasta shells.',
      },
      // Notes for User 2, Notebook 6
      {
        ownerId: 2,
        notebookId: 6,
        title: 'Workout Routine',
        description: 'Monday: Upper body, Tuesday: Cardio, Wednesday: Lower body, Thursday: Yoga, Friday: Rest.',
      },
      {
        ownerId: 2,
        notebookId: 6,
        title: 'Progress Notes',
        description: 'Increased bench press by 10 lbs, ran 3 miles in 25 minutes, and improved flexibility.',
      },
      // Notes for User 3, Notebook 7
      {
        ownerId: 3,
        notebookId: 7,
        title: 'Choreography Ideas',
        description: 'Focus on sharp movements for the verse and fluid transitions for the chorus.',
      },
      {
        ownerId: 3,
        notebookId: 7,
        title: 'Dance Practices',
        description: 'Practice the new routine at least 3 times a week, and refine the ending sequence.',
      },
      // Notes for User 3, Notebook 8
      {
        ownerId: 3,
        notebookId: 8,
        title: 'Strategy Notes',
        description: 'Use a defensive approach in the first half, then switch to an aggressive strategy.',
      },
      {
        ownerId: 3,
        notebookId: 8,
        title: 'Game Reviews',
        description: 'Analyzed last week\'s game, noted that defense was strong but needs better communication.',
      },
      // Notes for User 3, Notebook 9
      {
        ownerId: 3,
        notebookId: 9,
        title: 'Movie Ideas',
        description: 'A sci-fi thriller about time travel, with a twist ending that challenges perception.',
      },
      {
        ownerId: 3,
        notebookId: 9,
        title: 'Script Notes',
        description: 'Develop the main character\'s backstory, and include more dialogue in the second act.',
      },
      // Notes for User 4, Notebook 10
      {
        ownerId: 4,
        notebookId: 10,
        title: 'Photo Locations',
        description: 'Sunset Boulevard for golden hour shots, and the botanical garden for nature close-ups.',
      },
      {
        ownerId: 4,
        notebookId: 10,
        title: 'Camera Settings',
        description: 'Use f/1.8 for portraits, ISO 200 for daylight shots, and manual focus for macro photography.',
      },
      // Notes for User 4, Notebook 11
      {
        ownerId: 4,
        notebookId: 11,
        title: 'Fashion Sketches',
        description: 'Sketch a summer collection featuring floral patterns, light fabrics, and bold colors.',
      },
      {
        ownerId: 4,
        notebookId: 11,
        title: 'Color Palettes',
        description: 'Explore combinations of teal and coral for spring, and navy and gold for fall.',
      },
      // Notes for User 4, Notebook 12
      {
        ownerId: 4,
        notebookId: 12,
        title: 'Study Notes',
        description: 'Reviewed chapter on cognitive psychology, focusing on memory retention techniques.',
      },
      {
        ownerId: 4,
        notebookId: 12,
        title: 'Exam Prep',
        description: 'Create flashcards for key terms, and schedule study sessions leading up to the exam.',
      },
      // Notes for User 5, Notebook 13
      {
        ownerId: 5,
        notebookId: 13,
        title: 'Lyrics Ideas',
        description: 'Write a chorus that repeats the line "lost in the rhythm of time," with a melancholic tone.',
      },
      {
        ownerId: 5,
        notebookId: 13,
        title: 'Melodies',
        description: 'Experiment with a haunting melody in minor key, and add harmonies in the chorus.',
      },
      // Notes for User 5, Notebook 14
      {
        ownerId: 5,
        notebookId: 14,
        title: 'Workout Plan',
        description: 'Focus on HIIT workouts for fat loss, and incorporate weight training three times a week.',
      },
      {
        ownerId: 5,
        notebookId: 14,
        title: 'Nutrition Plan',
        description: 'Increase protein intake, reduce sugar, and incorporate more leafy greens into meals.',
      },
      // Notes for User 5, Notebook 15
      {
        ownerId: 5,
        notebookId: 15,
        title: 'Travel Ideas',
        description: 'Plan a trip to Japan, visit Tokyo, Kyoto, and Osaka, and explore cultural sites.',
      },
      {
        ownerId: 5,
        notebookId: 15,
        title: 'Packing List',
        description: 'Pack light clothing, comfortable shoes, a travel guide, and a camera with extra batteries.',
      },
      // Notes for User 6, Notebook 16
      {
        ownerId: 6,
        notebookId: 16,
        title: 'Rap Lyrics',
        description: 'Draft a verse that plays with internal rhymes and a fast-paced delivery.',
      },
      {
        ownerId: 6,
        notebookId: 16,
        title: 'Flow Patterns',
        description: 'Test out different flow patterns, alternating between staccato and legato styles.',
      },
      // Notes for User 6, Notebook 17
      {
        ownerId: 6,
        notebookId: 17,
        title: 'Business Ideas',
        description: 'Consider launching an online clothing store, focusing on streetwear and accessories.',
      },
      {
        ownerId: 6,
        notebookId: 17,
        title: 'Market Research',
        description: 'Analyze competitors in the streetwear market, and identify target demographics.',
      },
      // Notes for User 6, Notebook 18
      {
        ownerId: 6,
        notebookId: 18,
        title: 'Daily Diary',
        description: 'Reflect on today\'s experiences, including the challenges faced and lessons learned.',
      },
      {
        ownerId: 6,
        notebookId: 18,
        title: 'Dream Journal',
        description: 'Recorded a dream about flying, where I felt a sense of freedom and exhilaration.',
      },
      // Notes for User 7, Notebook 19
      {
        ownerId: 7,
        notebookId: 19,
        title: 'Dance Practice',
        description: 'Today\'s practice focused on perfecting turns and improving overall fluidity.',
      },
      {
        ownerId: 7,
        notebookId: 19,
        title: 'Choreography Notes',
        description: 'Incorporate more intricate footwork in the second half of the routine.',
      },
      // Notes for User 7, Notebook 20
      {
        ownerId: 7,
        notebookId: 20,
        title: 'Recipe Collection',
        description: 'Collected recipes for lasagna, tiramisu, and homemade bread.',
      },
      {
        ownerId: 7,
        notebookId: 20,
        title: 'Cooking Tips',
        description: 'Use fresh basil for better flavor in pasta dishes, and let meat rest before carving.',
      },
      // Notes for User 7, Notebook 21
      {
        ownerId: 7,
        notebookId: 21,
        title: 'Travel Destinations',
        description: 'Research top tourist attractions in Italy, including the Colosseum and Vatican City.',
      },
      {
        ownerId: 7,
        notebookId: 21,
        title: 'Budget Plan',
        description: 'Save 20% of monthly income for the upcoming trip, and set aside funds for souvenirs.',
      },
      // Notes for User 8, Notebook 22
      {
        ownerId: 8,
        notebookId: 22,
        title: 'Practice Log',
        description: 'Today\'s music practice focused on scales and improving finger dexterity.',
      },
      {
        ownerId: 8,
        notebookId: 22,
        title: 'Song Covers',
        description: 'Learned to play a cover of "Yesterday" by The Beatles, focusing on vocal harmonies.',
      },
      // Notes for User 8, Notebook 23
      {
        ownerId: 8,
        notebookId: 23,
        title: 'Workout Routine',
        description: 'Today\'s workout included strength training for arms and a 5-mile run.',
      },
      {
        ownerId: 8,
        notebookId: 23,
        title: 'Nutrition Journal',
        description: 'Tracked meals: breakfast (oatmeal), lunch (grilled chicken salad), dinner (stir-fried vegetables).',
      },
      // Notes for User 8, Notebook 24
      {
        ownerId: 8,
        notebookId: 24,
        title: 'Study Schedule',
        description: 'Study calculus on Monday, physics on Wednesday, and chemistry on Friday.',
      },
      {
        ownerId: 8,
        notebookId: 24,
        title: 'Homework Tracker',
        description: 'Finish math assignments by Thursday, and complete the lab report by Saturday.',
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
    options.tableName = 'Notes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: [
        'Project Plan', 'Meeting Notes', 'Grocery List', 'Weekend Plans', 'Song Ideas', 'Chord Progressions',
        'Flight Details', 'Accommodation', 'Recipe Ideas', 'Grocery List', 'Workout Routine', 'Progress Notes',
        'Choreography Ideas', 'Dance Practices', 'Strategy Notes', 'Game Reviews', 'Movie Ideas', 'Script Notes',
        'Photo Locations', 'Camera Settings', 'Fashion Sketches', 'Color Palettes', 'Study Notes', 'Exam Prep',
        'Lyrics Ideas', 'Melodies', 'Workout Plan', 'Nutrition Plan', 'Travel Ideas', 'Packing List',
        'Rap Lyrics', 'Flow Patterns', 'Business Ideas', 'Market Research', 'Daily Diary', 'Dream Journal',
        'Dance Practice', 'Choreography Notes', 'Recipe Collection', 'Cooking Tips', 'Travel Destinations', 'Budget Plan',
        'Practice Log', 'Song Covers', 'Workout Routine', 'Nutrition Journal', 'Study Schedule', 'Homework Tracker'
      ] }
    }, {});
  }
};
