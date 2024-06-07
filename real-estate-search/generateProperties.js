const { faker } = require('@faker-js/faker');
const fs = require('fs');

const generateProperties = (num) => {
  const properties = [];
  for (let i = 0; i < num; i++) {
    properties.push({
      id: i + 1,
      projectName: faker.company.name(),
      shortTitle: faker.lorem.words(3),
      price: faker.number.int({ min: 50000, max: 1000000 }),
      bedrooms: faker.number.int({ min: 1, max: 10 }),
      area: faker.number.int({ min: 500, max: 5000 }),
      shortDescription: faker.lorem.sentence(),
      saleOrRent: faker.helpers.arrayElement(['sale', 'rent']),
      images: [faker.image.url(), faker.image.url()]
    });
  }
  return properties;
};

const properties = generateProperties(100000); // Generate 1,000,000 properties
fs.writeFileSync('data/properties.json', JSON.stringify(properties));
console.log('Properties generated and saved to data/properties.json');
