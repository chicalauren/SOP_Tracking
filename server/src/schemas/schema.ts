import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type SOP {
    id: ID!
    title: String!
    version: String!
  }

  type Query {
    sops: [SOP!]!
  }
`;
