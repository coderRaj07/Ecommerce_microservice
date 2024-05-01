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
            allowNull: false,
            unique: true // Indexing on phone column
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
          first_name: {
            type: Sequelize.STRING,
            allowNull: true
          },
          last_name: {
            type: Sequelize.STRING,
            allowNull: true
          },
          profile_pic: {
            type: Sequelize.STRING,
            allowNull: true
          },
          verification_code: {
            type: Sequelize.INTEGER,
            allowNull: true
          },
          expiry: {
            type: Sequelize.DATE,
            allowNull: true
          },
          verified: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false // Compulsory with default value
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Compulsory createdAt field
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
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
