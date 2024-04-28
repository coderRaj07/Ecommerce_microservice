'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Check if the table already exists
      const tableExists = await queryInterface.sequelize.query(
        `SELECT to_regclass('public."Users"')`
      );

      // If the table doesn't exist, create it
      if (!tableExists[0][0].to_regclass) {
        await queryInterface.createTable('Users', {
          user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          phone: {
            type: Sequelize.STRING,
            allowNull: false
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false
          },
          salt: {
            type: Sequelize.STRING,
            allowNull: false
          },
          userType: {
            type: Sequelize.STRING,
            allowNull: false
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
          }
        });
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create table');
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
