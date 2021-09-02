const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    username: String!
    password: String!
    age: Int
    id: ID!
  }

  type Query {
    findAll: [User]
    findOne(id: ID!): User
  }
  type Mutation {
    createOne(username: String!, password: String!, age: Int): User

    updateOne(username: String, age: Int): User

    deleteOne(id: ID!): User
  }
`;

module.exports = typeDefs;
