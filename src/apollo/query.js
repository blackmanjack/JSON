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
