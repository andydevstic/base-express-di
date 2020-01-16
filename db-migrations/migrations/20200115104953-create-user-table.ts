'use strict';
import * as sequelize from 'sequelize';
import { IUserAttributes } from '@src/core/models/user/user';
import { ModelAttributeColumnOptions } from 'sequelize';

type IUserModelAttributes = {
  [columnName in keyof IUserAttributes]: ModelAttributeColumnOptions;
};

module.exports = {
  up: async (queryInterface: sequelize.QueryInterface, Sequelize: typeof sequelize) => {
   await queryInterface.createTable('users', <IUserModelAttributes>{
     id: {
       type: Sequelize.INTEGER,
       field: 'user_id',
       primaryKey: true,
       autoIncrement: true
     },
     email: {
       type: Sequelize.STRING,
       unique: true,
       allowNull: false,
       field: 'user_email'
     },
     firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'user_first_name'
     },
     lastName: {
      type: Sequelize.STRING,
      allowNull: true,
      field: 'user_last_name'
     },
     status_id: {
       type: Sequelize.SMALLINT,
       allowNull: false,
       field: 'user_status'
     },
     dateOfBirth: {
      type: Sequelize.DATE,
      allowNull: false,
      field: 'user_date_of_birth'
     },
     bio: {
       type: Sequelize.TEXT,
       allowNull: true,
       field: 'user_bio'
     },
     userTypeId: {
       type: Sequelize.SMALLINT,
       allowNull: false,
       field: 'user_type_id'
     },
     createdAt: {
       type: Sequelize.DATE,
       allowNull: false,
       defaultValue: Sequelize.NOW
     },
     updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
     }
   });
  },

  down: async (queryInterface: sequelize.QueryInterface, Sequelize: sequelize.Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
