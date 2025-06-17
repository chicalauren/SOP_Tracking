import { gql } from "@apollo/client";

// Get all SOPs
export const GET_SOPS = gql`
  query GetAllSOPs {
    getAllSOPs {
      _id
      title
      content
      priority
      status
      createdAt
      createdBy
      updatedAt
      updatedBy
    }
  }
`;

// Get one SOP by ID
export const GET_SOP_BY_ID = gql`
  query GetSOPById($id: ID!) {
    getSOPById(id: $id) {
      _id
      title
      content
      priority
      status
      createdAt
      createdBy
      updatedAt
      updatedBy
    }
  }
`;
