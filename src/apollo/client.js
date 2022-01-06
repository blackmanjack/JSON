import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // uri: process.env.HASURA_GRAPHQL_URI,
  uri: "http://localhost:4000/graphql",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  cache: new InMemoryCache(),
});
export default client;
