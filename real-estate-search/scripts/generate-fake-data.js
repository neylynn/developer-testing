const { faker } = require('@faker-js/faker');
const Property = require('../models/property');
const sequelize = require('../config/database');

const generateFakeData = async (count) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: true });
    console.log('Database synchronized.');

    for (let i = 0; i < count; i++) {
      await Property.create({
        name: faker.company.name(),
        title: faker.lorem.sentence(),
        price: faker.number.float({ min: 100000, max: 1000000 }),
        bedrooms: faker.number.float({ min: 1, max: 5 }),
        area: faker.number.float({ min: 500, max: 5000 }),
        description: faker.lorem.paragraph(),
        images: [
          faker.image.url(),
          faker.image.url(),
          faker.image.url(),
          faker.image.url(),
          faker.image.url()
        ],
        saleOrRent: faker.helpers.arrayElement(['sale', 'rent'])
      });
    }

    console.log(`Inserted ${count} properties.`);
  } catch (error) {
    console.error('Error generating fake data:', error);
  } finally {
    process.exit();
  }
};

const count = parseInt(process.argv[2], 10) || 10000;
generateFakeData(count);
