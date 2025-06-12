import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import sopRoutes from './routes/sopRoutes';
import authRoutes from './routes/authRoutes';

const app: express.Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// REST API Routes
app.use('/api/sops', sopRoutes);
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (_req, res) => {
  res.send('SOP Tracking API is live');
});

// Apollo Server setup
export const startApolloServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app }); // mounts on /graphql
};

export default app;

