const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('real_estate', 'root', 'naylinn123', {
  host: 'localhost',
  dialect: 'mysql'
});

const syncDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

syncDb();

module.exports = sequelize;
