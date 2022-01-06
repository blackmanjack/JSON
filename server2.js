var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const { axios } = require("axios");
const fetch = require("cross-fetch");
const baseURL = `https://jsonplaceholder.typicode.com`;
var cors = require("cors");

var schema = buildSchema(`
  input AlbumInput {
    title: String!
    user: UserInput
  }
  
  input UserInput {
    name: String
    username: String
    email: String
    address: AddressInput
    phone: String
    website: String
    company: CompanyInput
  }
  
  input AddressInput {
    street: String
    suite: String
    city: String
    zipcode: String
    geo: GeoLocalisationInput
  }
  
  input CompanyInput {
    name: String
    catchPhrase: String
    bs: String
  }
  
  type Album {
    id: Int
    title: String
    user: User
  }
  
  type User {
    id: Int 
    name: String
    username: String
    email: String
    address: Address
    phone: String
    website: String
    company: Company
  }
  
  type Address {
    street: String
    suite: String
    city: String
    zipcode: String
    geo: GeoLocalisation
  }
  
  type Company {
    name: String
    catchPhrase: String
    bs: String
  }
  
  type Query {
    albums: [Album]
    album(id: Int!): Album
    comments: [Comment]
    comment(id: Int!): Comment
    photos: [Photo]
    photo(id: Int!): Photo
    posts: [Post]
    post(id: Int!): Post
    todos: [Todo]
    todo(id: Int!): Todo
    users: [User]
    user(id: Int!): User
  }
  
  type Comment {
    id: Int
    name: String
    email: String
    body: String
    post: Post
  }
  
  type Photo {
    id: Int
    title: String
    url: String
    thumbnailUrl: String
    album: Album
  }
  
  type Post {
    id: Int
    title: String
    body: String
    userId: Int
    user: [User]
    comment: [Comment]
  }
  
  type Todo {
    id: Int
    title: String
    completed: Boolean
    user: User
  }
  
  type Mutation {
    createAlbum(album: AlbumInput): Album
    updateAlbum(id: Int!, album: AlbumInput): Album
    deleteAlbum(id: Int!): Boolean
    createComment(comment: CommentInput, post: PostInput): Comment
    updateComment(id: Int!, comment: CommentInput, post: PostInput): Comment
    deleteComment(id: Int!): Boolean
    createPhoto(photo: PhotoInput): Photo
    updatePhoto(id: Int!, photo: PhotoInput): Photo
    deletePhoto(id: Int!): Boolean
    createPost(post: PostInput): Post
    updatePost(id: Int!, post: PostInput): Post
    deletePost(id: Int!): Boolean
    createTodo(todo: TodoInput): Todo
    updateTodo(id: Int!, todo: TodoInput): Todo
    deleteTodo(id: Int!): Boolean
    createUser(user: UserInput): User
    updateUser(id: Int!, user: UserInput): User
    deleteUser(id: Int!): Boolean
  }
  
  input CommentInput {
    name: String
    email: String
    body: String
  }
  
  input PostInput {
    title: String
    body: String
    user: UserInput
  }
  
  input PhotoInput {
    title: String
    url: String
    thumbnailUrl: String
    album: AlbumInput
  }
  
  input TodoInput {
    title: String
    completed: Boolean
    user: UserInput
  }
  
  input GeoLocalisationInput {
    lat: String
    lng: String
  }
  
  type GeoLocalisation {
    lat: String
    lng: String
  }
  
`);

var root = {
  users: () => {
    //const { id } = args;
    return fetch(`${baseURL}/users/`).then((res) => res.json());
  },
  user: {
    posts: (parent) => {
      const { id } = parent;
      return fetch(`${baseURL}/users/${id}`).then((res) => res.json());
    },
  },
  posts: () => {
    //const { id } = args;
    return fetch(`${baseURL}/posts/`).then((res) => res.json());
  },
  post: {
    users: (parent) => {
      const { id } = parent;
      return fetch(`${baseURL}/posts/${id}`).then((res) => res.json());
    },
  },
};
var app = express();
// app.use(
//   "/",
//   graphqlHTTP(
//     {
//       schema: schema,
//       rootValue: root,
//       graphiql: true,
//     },
//     cors()
//   )
// );
app.use(cors()); // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000, () => console.log("Now browse to localhost:4000/graphql"));
