'use strict';
const dotenv = require("dotenv").config({path: '../.env'});
const bcrypt = require("bcrypt");
const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD
console.log(email,password)

// const hash = bcrypt.hashSync(`${password}`, 10);
const hash = bcrypt.hashSync(`hghxjcmhb`, 10);
console.log(hash)
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users',[
      {
        email:email,
        password: `${hash}`,
        role:`admin`
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
