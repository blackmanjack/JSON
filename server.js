const { GraphQLServer } = require("graphql-yoga");
const { axios } = require("axios");

const baseURL = `https://jsonplaceholder.typicode.com/`;

const resolvers = {
  Query: {
    users: () => {
      return axios.get(`${baseURL}/users`).then((res) => res.json());
    },
    // user: (parent, args) => {
    //   const { id } = args;
    //   return axios.get(`${baseURL}/users/${id}`).then((res) => res.json());
    // },
    // posts: () => {
    //   return axios.get(`${baseURL}/posts`).then((res) => res.json());
    // },
    // post: (parent, args) => {
    //   const { id } = args;
    //   return axios.get(`${baseURL}/posts/${id}`).then((res) => res.json());
    // },
  },
  // Post: {
  //   username: (parent) => {
  //     const { id } = parent;
  //     return axios.get(`${baseURL}/posts/${id}/user`).then((res) => res.json());
  //   },
  // },
  User: {
    posts: (parent) => {
      const { id } = parent;
      return axios.get(`${baseURL}/users/1`).then((res) => res.json());
    },
  },
};

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
