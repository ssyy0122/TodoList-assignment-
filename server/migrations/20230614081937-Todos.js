'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable("Todos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      createAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updateAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      isCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable("Todos");
  },
};