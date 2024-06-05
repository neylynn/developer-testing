import { ApolloServer, gql } from 'apollo-server-micro';
import { listings } from '../../data'; // Assuming you have some data or database connection

const typeDefs = gql`
  type Listing {
    id: ID!
    projectName: String!
    shortTitle: String!
    price: Float!
    bedrooms: Int!
    area: Float!
    shortDescription: String!
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
      // Filter logic here
      return listings.filter(listing => {
        if (args.saleOrRent && listing.saleOrRent !== args.saleOrRent) return false;
        if (args.minPrice && listing.price < args.minPrice) return false;
        if (args.maxPrice && listing.price > args.maxPrice) return false;
        if (args.minBedrooms && listing.bedrooms < args.minBedrooms) return false;
        if (args.maxBedrooms && listing.bedrooms > args.maxBedrooms) return false;
        if (args.minArea && listing.area < args.minArea) return false;
        if (args.maxArea && listing.area > args.maxArea) return false;
        return true;
      });
    }
  }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: '/api/graphql' });
