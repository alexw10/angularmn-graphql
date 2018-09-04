import { gql } from 'apollo-server-express';

const TYPEDEFS = gql`
  type Hero {
    id: Int
    name: String
    voteCount: Int
  }
  type Query {
    allHeroes(searchTerm: String): [Hero]
    hero(id: Int!): Hero
  }
  type Mutation {
    addHero(name: String!): Hero
    upvote(id: Int!): Hero
    downvote(id: Int!): Hero
  }
`;

export default TYPEDEFS;
