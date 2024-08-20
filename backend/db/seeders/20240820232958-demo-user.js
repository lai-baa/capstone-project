'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
   await User.bulkCreate([
    {
      firstName: 'Hongjoong',
      lastName: 'Kim',
      email: 'khj@kaykew.io',
      username: 'khj1107',
      hashedPassword: bcrypt.hashSync('8makes1team')
    },
    {
      firstName: 'Seonghwa',
      lastName: 'Park',
      email: 'psh@kaykew.io',
      username: 'psh0403',
      hashedPassword: bcrypt.hashSync('password2')
    },
    {
      firstName: 'Yunho',
      lastName: 'Jeong',
      email: 'jyh@kaykew.io',
      username: 'jyh0323',
      hashedPassword: bcrypt.hashSync('password3')
    },
    {
      firstName: 'Yeosang',
      lastName: 'Kang',
      username: 'kys0615',
      email: 'kys@kaykew.io',
      hashedPassword: bcrypt.hashSync('password4')
    },
    {
      firstName: 'San',
      lastName: 'Choi',
      username: 'csn0710',
      email: 'csn@kaykew.io',
      hashedPassword: bcrypt.hashSync('password5')
    },
    {
      firstName: 'Mingi',
      lastName: 'Song',
      username: 'smg0809',
      email: 'smg@kaykew.io',
      hashedPassword: bcrypt.hashSync('password6')
    },
    {
      firstName: 'Wooyoung',
      lastName: 'Jung',
      username: 'jwy1126',
      email: 'jwy@kaykew.io',
      hashedPassword: bcrypt.hashSync('password7')
    },
    {
      firstName: 'Jongho',
      lastName: 'Choi',
      username: 'cjh1012',
      email: 'cjh@kaykew.io',
      hashedPassword: bcrypt.hashSync('password8')
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
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['khj1107', 'psh0403', 'jyh0323', 'kys0615', 'csn0710', 'smg0809', 'jwy1126', 'cjh1012'] }
    }, {});
  }
};
