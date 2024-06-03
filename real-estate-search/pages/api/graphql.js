import { ApolloServer, gql } from 'apollo-server-micro';
import Property from '../../models/property';

const typeDefs = gql`
  type Property {
    id: ID!
    name: String!
    title: String!
    price: Float!
    bedrooms: Int!
    area: Float!
    description: String!
    images: [String]!
    saleOrRent: String!
  }

  type Query {
    properties(
      saleOrRent: String,
      minPrice: Float,
      maxPrice: Float,
      bedrooms: Int,
      minArea: Float,
      maxArea: Float
    ): [Property]
  }
`;

const resolvers = {
  Query: {
    properties: async (_, args) => {
      const { saleOrRent, minPrice, maxPrice, bedrooms, minArea, maxArea } = args;
      let where = {};
      if (saleOrRent) where.saleOrRent = saleOrRent;
      if (minPrice !== undefined) where.price = { [Op.gte]: minPrice };
      if (maxPrice !== undefined) where.price = { [Op.lte]: maxPrice };
      if (bedrooms !== undefined) where.bedrooms = bedrooms;
      if (minArea !== undefined) where.area = { [Op.gte]: minArea };
      if (maxArea !== undefined) where.area = { [Op.lte]: maxArea };
      return await Property.findAll({ where });
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