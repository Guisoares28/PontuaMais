// config/config.js
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
};
