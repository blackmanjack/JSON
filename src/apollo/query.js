import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    users {
      id
      name
      username
      email
      address {
        street
      }
    }
  }
`;

export const GET_POSTS = gql`
  query {
    posts {
      id
      title
      body
      userId
      user {
        username
        company {
          name
        }
      }
    }
  }
`;
