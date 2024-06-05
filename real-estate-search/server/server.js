// server/server.js

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

// module.exports = async (req, res) => {
//   if (req.method === 'OPTIONS') {
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.status(200).end();
//     return;
//   }

//   await apolloServer.start();
//   await apolloServer.createHandler({ path: '/api/graphql', cors: corsOptions })(req, res);
// };
