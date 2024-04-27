// databaseClient.ts

import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('user_service', 'root', 'root', {
  host: '127.0.0.1',
  dialect: 'postgres', // or any other dialect supported by Sequelize
  port: 5433,
  logging: true, // Enable logging to see SQL queries
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error: any) => {
    console.error('Unable to connect to the database:', error);
  });
