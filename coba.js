var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
// const fetch = require("node-fetch");

const schema = buildSchema(`
type Query {
    id: ID!,
    name: String!,
    email: String!,
  }
    type Mutation {
      createUser(name: String!): User!
      updateUser(id: ID!, name: String!): User
      deleteUser(id: ID!): User
    }
    
    type Query {
      users: [User!]!
      user(id: ID!): User
      posts: [Post!]!
      post(id: ID!): Post
    }
    
    type User {
      id: ID!
      name: String!
      posts: [Post!]!
    }
    
    type Post {
      id: ID!
      title: String!
      body: String!
      comment: [Comment]
    }
  
    type Comment {
      id: ID!
      title: String!
      body: [comment
      ]
    }
`);

const baseURL = `https://jsonplaceholder.typicode.com/`;

// const resolvers = {
//   Query: {
//     users: () => {
//       return fetch(`${baseURL}/users`).then((res) => res.json());
//     },
//     user: (parent, args) => {
//       const { id } = args;
//       return fetch(`${baseURL}/users/${id}`).then((res) => res.json());
//     },
//     posts: () => {
//       return fetch(`${baseURL}/posts`).then((res) => res.json());
//     },
//     post: (parent, args) => {
//       const { id } = args;
//       return fetch(`${baseURL}/blog/posts/${id}`).then((res) => res.json());
//     },
//   },
// };

var root = {
  // users: () => {
  //   return fetch(`${baseURL}/users`).then((res) => res.json());
  // },
  // user: (parent, args) => {
  //   const { id } = args;
  //   return fetch(`${baseURL}/users/${id}`).then((res) => res.json());
  // },
  // posts: () => {
  //   return fetch(`${baseURL}/posts`).then((res) => res.json());
  // },
  // post: (parent, args) => {
  //   const { id } = args;
  //   return fetch(`${baseURL}/posts/${id}`).then((res) => res.json());
  // },
  name: () => {
    return "brachio";
  },
  email: () => {
    return "brachio@email.com";
  },
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));
