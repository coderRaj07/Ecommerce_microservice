'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id',
        },
      },
      address_line1: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      address_line2: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      post_code: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('Addresses', ['city'], {
      name: 'cityIndex',
    });

    await queryInterface.addIndex('Addresses', ['post_code'], {
      name: 'postCodeIndex',
    });

    await queryInterface.addIndex('Addresses', ['country'], {
      name: 'countryIndex',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Addresses');
  },
};