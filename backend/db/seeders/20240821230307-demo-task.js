'use strict';

const { Task } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

// Function to calculate the reminder date
const getReminderDate = (dueDate, daysBefore = 5) => {
  const reminderDate = new Date(dueDate);
  reminderDate.setDate(reminderDate.getDate() - daysBefore);
  return reminderDate;
};

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
    await Task.bulkCreate([
      {
        userId: 1,
        title: 'Complete Project Plan',
        description: 'Finish the project plan and share it with the team for review.',
        dueDate: '2024-10-10',
        priority: 'high',
        completed: false
      },
      {
        userId: 1,
        title: 'Prepare Presentation',
        description: 'Create slides for the upcoming presentation on project milestones.',
        dueDate: '2024-10-15',
        priority: 'medium',
        completed: false
      },
      {
        userId: 2,
        title: 'Book Flights',
        description: 'Book flights for the annual company retreat.',
        dueDate: '2024-10-12',
        priority: 'high',
        completed: false
      },
      {
        userId: 2,
        title: 'Review Budget',
        description: 'Go over the budget with the finance team.',
        dueDate: '2024-11-01',
        priority: 'medium',
        completed: false
      },
      {
        userId: 3,
        title: 'Design New Logo',
        description: 'Work on designing a new logo for the rebranding project.',
        dueDate: '2024-10-20',
        priority: 'low',
        completed: false
      },
      {
        userId: 3,
        title: 'Create Marketing Strategy',
        description: 'Develop a marketing strategy for the upcoming product launch.',
        dueDate: '2024-11-10',
        priority: 'high',
        completed: false
      },
      {
        userId: 4,
        title: 'Organize Photoshoot',
        description: 'Arrange a photoshoot for the new collection.',
        dueDate: '2024-10-25',
        priority: 'medium',
        completed: false
      },
      {
        userId: 4,
        title: 'Edit Photos',
        description: 'Edit the photos from the recent photoshoot.',
        dueDate: '2024-11-05',
        priority: 'low',
        completed: false
      },
      {
        userId: 5,
        title: 'Write Song Lyrics',
        description: 'Complete the lyrics for the new song.',
        dueDate: '2024-10-15',
        priority: 'high',
        completed: false
      },
      {
        userId: 5,
        title: 'Record Vocals',
        description: 'Book studio time and record the vocals.',
        dueDate: '2024-11-01',
        priority: 'medium',
        completed: false
      },
      {
        userId: 6,
        title: 'Prepare Business Proposal',
        description: 'Draft and review the business proposal for the new venture.',
        dueDate: '2024-10-30',
        priority: 'high',
        completed: false
      },
      {
        userId: 6,
        title: 'Conduct Market Analysis',
        description: 'Analyze market trends and competitors.',
        dueDate: '2024-11-15',
        priority: 'medium',
        completed: false
      },
      {
        userId: 7,
        title: 'Choreograph New Dance Routine',
        description: 'Choreograph a new routine for the upcoming performance.',
        dueDate: '2024-10-18',
        priority: 'high',
        completed: false
      },
      {
        userId: 7,
        title: 'Practice Dance Routine',
        description: 'Schedule and attend practice sessions.',
        dueDate: '2024-11-03',
        priority: 'medium',
        completed: false
      },
      {
        userId: 8,
        title: 'Study for Final Exams',
        description: 'Review notes and complete study guides for final exams.',
        dueDate: '2024-10-25',
        priority: 'high',
        completed: false
      },
      {
        userId: 8,
        title: 'Complete Homework Assignments',
        description: 'Finish all pending homework assignments.',
        dueDate: '2024-11-08',
        priority: 'medium',
        completed: false
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
    options.tableName = 'Tasks';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: [
        'Complete Project Plan', 'Prepare Presentation', 'Book Flights', 'Review Budget', 
        'Design New Logo', 'Create Marketing Strategy', 'Organize Photoshoot', 'Edit Photos', 
        'Write Song Lyrics', 'Record Vocals', 'Prepare Business Proposal', 'Conduct Market Analysis', 
        'Choreograph New Dance Routine', 'Practice Dance Routine', 'Study for Final Exams', 
        'Complete Homework Assignments'
      ] }
    }, {});
  }
};
