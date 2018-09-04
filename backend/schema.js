import { gql } from 'apollo-server-express';

const TYPEDEFS = gql`
  type Hero {
    id: String
    name: String
    voteCount: Int
  }
  type Query {
    allHeroes(searchTerm: String): [Hero]
    hero(id: String!): Hero
  }
  type Mutation {
    addHero(name: String!): Hero
    upvote(id: String!): Hero
    downvote(id: String!): Hero
  }
`;

export default TYPEDEFS;
