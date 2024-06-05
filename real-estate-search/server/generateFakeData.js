// server/generateFakeData.js

const { faker } = require('@faker-js/faker');
const db = require('./db');

async function generateFakeData() {
  await db.sequelize.sync({ force: true });  // Ensure the database schema is created

  const Property = db.Property;

  // Generate 10,000 fake properties
  for (let i = 0; i < 100; i++) {
    const property = {
      projectName: faker.company.name(),
      shortTitle: faker.lorem.sentence(),
      price: faker.number.float({ min: 10000, max: 1000000 }),
      bedrooms: faker.number.float({ min: 1, max: 5 }),
      area: faker.number.float({ min: 50, max: 500 }),
      shortDescription: faker.lorem.sentence(),
      imageUrls: Array.from({ length: 5 }, () => faker.image.url()),
    };

    await Property.create(property);
  }

  console.log('Fake data generation completed.');
}

generateFakeData();
