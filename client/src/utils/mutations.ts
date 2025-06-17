import { gql } from "@apollo/client";

export const CREATE_SOP = gql`
  mutation CreateSOP($title: String!, $content: String!, $priority: String) {
    createSOP(title: $title, content: $content, priority: $priority) {
      _id
      title
      content
      priority
      status
      createdAt
      createdBy
      updatedAt
    }
  }
`;
// Update SOP
export const UPDATE_SOP = gql`
  mutation UpdateSOP(
    $id: ID!
    $title: String
    $content: String
    $priority: String
    $status: String
    $updatedAt: String
    $updatedBy: String
  ) {
    updateSOP(
      id: $id
      title: $title
      content: $content
      priority: $priority
      status: $status
      updatedAt: $updatedAt
      updatedBy: $updatedBy
    ) {
      _id
      title
      content
      priority
      status
      createdAt
      updatedAt
      createdBy
      updatedBy
    }
  }
`;

// Delete SOP
export const DELETE_SOP = gql`
  mutation DeleteSOP($id: ID!) {
    deleteSOP(id: $id)
  }
`;
