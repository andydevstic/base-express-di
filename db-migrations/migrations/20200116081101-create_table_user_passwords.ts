'use strict';
import * as sequelize from 'sequelize';

module.exports = {
  up: async (queryInterface: sequelize.QueryInterface, Sequelize: typeof sequelize) => {
   await queryInterface.createTable('user_passwords', {
    userId: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false,
      field: 'user_id'
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'user_password'
    }
   });
  },

  down: async (queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) => {
    await queryInterface.dropTable('user_passwords');
  }
};
