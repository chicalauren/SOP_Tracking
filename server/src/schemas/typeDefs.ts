import { gql } from "apollo-server-express";

const typeDefs = gql`
  type SOP {
    _id: ID!
    title: String!
    content: String!
    priority: String!
    status: String!
    createdAt: String!
    updatedAt: String!
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    role: String!
  }

  type Query {
    getAllSOPs: [SOP!]!
    getSOPById(_id: ID!): SOP
  }

  type Mutation {
    createSOP(title: String!, content: String!, priority: String!): SOP!
    updateSOP(
      _id: ID!
      title: String
      content: String
      priority: String
      status: String
    ): SOP!
    deleteSOP(_id: ID!): Boolean!
    updateUserRole(userId: ID!, role: String!): User!
  }
`;

export default typeDefs;
