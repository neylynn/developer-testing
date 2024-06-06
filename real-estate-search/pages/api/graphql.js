import { ApolloServer, gql } from 'apollo-server-micro';
import fs from 'fs';
import path from 'path';

const properties = JSON.parse(fs.readFileSync(path.resolve('./data/properties.json'), 'utf8'));

const typeDefs = gql`
  type Listing {
    id: ID!
    projectName: String!
    shortTitle: String!
    price: Float!
    bedrooms: Int!
    area: Float!
    shortDescription: String!
    saleOrRent: String!
    images: [String!]!
  }

  type Query {
    listings(
      saleOrRent: String
      minPrice: Float
      maxPrice: Float
      minBedrooms: Int
      maxBedrooms: Int
      minArea: Float
      maxArea: Float
    ): [Listing!]!
  }
`;

const resolvers = {
  Query: {
    listings: (_, args) => {
      let filteredProperties = properties;

      if (args.saleOrRent) {
        filteredProperties = filteredProperties.filter(property => property.saleOrRent === args.saleOrRent);
      }
      if (args.minPrice) {
        filteredProperties = filteredProperties.filter(property => property.price >= args.minPrice);
      }
      if (args.maxPrice) {
        filteredProperties = filteredProperties.filter(property => property.price <= args.maxPrice);
      }
      if (args.minBedrooms) {
        filteredProperties = filteredProperties.filter(property => property.bedrooms >= args.minBedrooms);
      }
      if (args.maxBedrooms) {
        filteredProperties = filteredProperties.filter(property => property.bedrooms <= args.maxBedrooms);
      }
      if (args.minArea) {
        filteredProperties = filteredProperties.filter(property => property.area >= args.minArea);
      }
      if (args.maxArea) {
        filteredProperties = filteredProperties.filter(property => property.area <= args.maxArea);
      }

      return filteredProperties;
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

let serverStartPromise;

export default async function handler(req, res) {
  if (!serverStartPromise) {
    serverStartPromise = apolloServer.start();
  }
  await serverStartPromise;
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res);
}
