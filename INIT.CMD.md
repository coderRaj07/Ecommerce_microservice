------------User Service-----------

npm i -g serverless

sls
(select http-api)

npm init

sls plugin install --name serverless-offline

sls plugin install --name serverless-plugin-typescript

tsc --init

npm i aws-lambda --dev typescript ts-node @types/aws-lambda

yarn run dev

yarn add @middy/core

yarn add @middy/http-json-body-parser

yarn add class-transformer class-validator tsyringe reflect-metadata

yarn add bcrypt && yarn add --dev @types/bcrypt

yarn add jsonwebtoken && yarn add --dev @types/jsonwebtoken

yarn add dayjs



## To run postgresql from docker 

## (docker-desktop must be running in background)

docker-compose up 



## Adding sequelize ORM for PGSQL

yarn add sequelize pg mysql2

yarn add --dev sequelize-cli

npx sequelize-cli init

npx sequelize-cli migration:generate --name create-users-table


## Make changes in migration file

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

## Run that migration file

npx sequelize db:migrate

## In case of schema changes 

## Run the following command again to generate migration file

npx sequelize-cli migration:generate --name create-users-table

## Make changes in migration file

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

## Run again

npx sequelize db:migrate

## If want to revert changes (It will go for old table data and and undo changes)

npx sequelize db:migrate:undo

## On config/config.json

## Taking reference from docker-compose.yml

{
  "username": "root",
  "password": "root",
  "database": "user_service",
  "host": "127.0.0.1",
  "dialect": "postgres",
  "port": 5433
}

npx sequelize-cli db:migrate


## create an IAM user and accesskey

aws configure

## Default region name [ap-south-1]: 

## Default output format [None]: json



## To run the app

yarn run dev

docker-compose up