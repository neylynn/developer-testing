const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('real_estate', 'root', 'naylinn123', {
  host: 'localhost',  
  dialect: 'mysql',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Property = require('./models/Property')(sequelize, Sequelize);

module.exports = db;
