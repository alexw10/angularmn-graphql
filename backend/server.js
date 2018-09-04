import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, ApolloServer } from 'apollo-server-express';
import TYPEDEFS from './schema.js';
import RESOLVERS from './resolvers.js';
import axios from 'axios';

const SERVER = new ApolloServer({
  typeDefs: TYPEDEFS,
  resolvers: RESOLVERS,
  playground: {
    endpoint: `http://localhost:4000/graphql`,
    settings: {
      'editor.theme': 'dark'
    }
  }
});

const app = express();

SERVER.applyMiddleware({
  app: app
});

app.listen(4000, () => {
  console.log('Express server running on port 4000');
});
