import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, ApolloServer } from 'apollo-server-express';
import { gql } from 'apollo-server-express';
import axios from 'axios';

const TYPEDEFS = gql`
  type Query {
    test_query: Test
  }
  type Test {
    test_field_1: String
    test_field_2: Int
    test_field_3: Boolean
  }
`;

const RESOLVERS = {
  Query: {
    test_query: (parent, args) => {
      return axios
        .get(`www.apiurl.com/people`)
        .then(response => response.data)
        .catch(error => console.log(error));
    }
  }
};

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
