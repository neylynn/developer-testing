const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const db = require('./db');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
});

const corsOptions = {
  origin: '*',  // You can restrict this to specific origins if needed
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

async function startServer() {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 3000 },
      context: async ({ req }) => ({ db }),
    });
    console.log(`🚀 Server ready at ${url}`);
}   
  
startServer().catch((error) => {
    console.error('Error starting the server', error);
});
