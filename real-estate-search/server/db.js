// server/db.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('real_estate', 'root', 'naylinn123', {
  host: 'localhost',  // use 'localhost' if running MySQL locally, 'mysql' if using Docker Compose
  dialect: 'mysql',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Property = require('./models/Property')(sequelize, Sequelize);

module.exports = db;
