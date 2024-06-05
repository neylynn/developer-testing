import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
type Query {
    listings(
      saleOrRent: String,
      minPrice: Float,
      maxPrice: Float,
      minBedrooms: Int,
      maxBedrooms: Int,
      minArea: Float,
      maxArea: Float
    ): [Listing]
  }

  type Listing {
    id: ID!
    projectName: String!
    shortTitle: String!
    price: Int!
    bedrooms: Int!
    area: Int!
    shortDescription: String!
    images: [String]!
  }
`;

export const resolvers = {
  Query: {
    listings: (parent, args, context, info) => {
      // Mock data or actual data fetching logic
      return [
        {
          id: '1',
          projectName: 'Project 1',
          shortTitle: 'Great Place',
          price: 250000,
          bedrooms: 3,
          area: 1200,
          shortDescription: 'A great place to live.',
          images: ['/images/listing1.jpg'],
        },
        // Add more listings as needed
      ];
    },
  },
};
