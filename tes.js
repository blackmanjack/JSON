var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
// const fetch = require("node-fetch");
// var schema = buildSchema(`
// type Query {
//     Users: [User]
//   }

//   type User {
//     id: ID!
//     name: String!
//     username: String!
//     email: String!
//     address: String!
//     phone: String!
//     company: [Company]
//     posts: [Post!]!
//     website: String!
//   }

//   type Address {
//     street: String!
//     suite: String!
//     city: String!
//     zipcode: String!
//     geo: [Geo]
//   }

//   type Geo {
//     lat: String!
//     lng: String!
//   }

//   type Company {
//     name: String!
//     catchPhrase: String!
//     bs: String!
//   }

//   type Post {
//     id: ID!
//     title: String!
//     body: String!
//     user: User!
//   }

//   type Comments {
//     postId: String!
//     id: ID!
//     name: String!
//     email: String!
//     body: String!
//   }
// `);
const schema = buildSchema(`
directive @cacheControl(
  maxAge: Int
  scope: CacheControlScope
) on FIELD_DEFINITION | OBJECT | INTERFACE
type Address {
  street: String
  suite: String
  city: String
  zipcode: String
  geo: Geo
}

input AddressInput {
  street: String
  suite: String
  city: String
  zipcode: String
  geo: GeoInput
}

type Album {
  id: ID
  title: String
  user: User
  photos(options: PageQueryOptions): PhotosPage
}

type AlbumsPage {
  data: [Album]
  links: PaginationLinks
  meta: PageMetadata
}

enum CacheControlScope {
  PUBLIC
  PRIVATE
}

type Comment {
  id: ID
  name: String
  email: String
  body: String
  post: Post
}

type CommentsPage {
  data: [Comment]
  links: PaginationLinks
  meta: PageMetadata
}

type Company {
  name: String
  catchPhrase: String
  bs: String
}

input CompanyInput {
  name: String
  catchPhrase: String
  bs: String
}

input CreateAlbumInput {
  title: String!
  userId: ID!
}

input CreateCommentInput {
  name: String!
  email: String!
  body: String!
}

input CreatePhotoInput {
  title: String!
  url: String!
  thumbnailUrl: String!
}

input CreatePostInput {
  title: String!
  body: String!
}

input CreateTodoInput {
  title: String!
  completed: Boolean!
}

input CreateUserInput {
  name: String!
  username: String!
  email: String!
  address: AddressInput
  phone: String
  website: String
  company: CompanyInput
}

type Geo {
  lat: Float
  lng: Float
}

input GeoInput {
  lat: Float
  lng: Float
}

type Mutation {
  _: Int
  createAlbum(input: CreateAlbumInput!): Album
  updateAlbum(id: ID!, input: UpdateAlbumInput!): Album
  deleteAlbum(id: ID!): Boolean
  createComment(input: CreateCommentInput!): Comment
  updateComment(id: ID!, input: UpdateCommentInput!): Comment
  deleteComment(id: ID!): Boolean
  createPhoto(input: CreatePhotoInput!): Photo
  updatePhoto(id: ID!, input: UpdatePhotoInput!): Photo
  deletePhoto(id: ID!): Boolean
  createPost(input: CreatePostInput!): Post
  updatePost(id: ID!, input: UpdatePostInput!): Post
  deletePost(id: ID!): Boolean
  createTodo(input: CreateTodoInput!): Todo
  updateTodo(id: ID!, input: UpdateTodoInput!): Todo
  deleteTodo(id: ID!): Boolean
  createUser(input: CreateUserInput!): User
  updateUser(id: ID!, input: UpdateUserInput!): User
  deleteUser(id: ID!): Boolean
}

enum OperatorKindEnum {
  GTE
  LTE
  NE
  LIKE
}

input OperatorOptions {
  kind: OperatorKindEnum
  field: String
  value: String
}

type PageLimitPair {
  page: Int
  limit: Int
}

type PageMetadata {
  totalCount: Int
}

input PageQueryOptions {
  paginate: PaginateOptions
  slice: SliceOptions
  sort: [SortOptions]
  operators: [OperatorOptions]
  search: SearchOptions
}

input PaginateOptions {
  page: Int
  limit: Int
}

type PaginationLinks {
  first: PageLimitPair
  prev: PageLimitPair
  next: PageLimitPair
  last: PageLimitPair
}

type Photo {
  id: ID
  title: String
  url: String
  thumbnailUrl: String
  album: Album
}

type PhotosPage {
  data: [Photo]
  links: PaginationLinks
  meta: PageMetadata
}

type Post {
  id: ID
  title: String
  body: String
  user: User
  comments(options: PageQueryOptions): CommentsPage
}

type PostsPage {
  data: [Post]
  links: PaginationLinks
  meta: PageMetadata
}

type Query {
  _: Int
  albums(options: PageQueryOptions): AlbumsPage
  album(id: ID!): Album
  comments(options: PageQueryOptions): CommentsPage
  comment(id: ID!): Comment
  photos(options: PageQueryOptions): PhotosPage
  photo(id: ID!): Photo
  posts(options: PageQueryOptions): PostsPage
  post(id: ID!): Post
  todos(options: PageQueryOptions): TodosPage
  todo(id: ID!): Todo
  users(options: PageQueryOptions): UsersPage
  user(id: ID!): User
}

input SearchOptions {
  q: String
}

input SliceOptions {
  start: Int
  end: Int
  limit: Int
}

input SortOptions {
  field: String
  order: SortOrderEnum
}

enum SortOrderEnum {
  ASC
  DESC
}

type Todo {
  id: ID
  title: String
  completed: Boolean
  user: User
}

type TodosPage {
  data: [Todo]
  links: PaginationLinks
  meta: PageMetadata
}

input UpdateAlbumInput {
  title: String
  userId: ID
}

input UpdateCommentInput {
  name: String
  email: String
  body: String
}

input UpdatePhotoInput {
  title: String
  url: String
  thumbnailUrl: String
}

input UpdatePostInput {
  title: String
  body: String
}

input UpdateTodoInput {
  title: String
  completed: Boolean
}

input UpdateUserInput {
  name: String
  username: String
  email: String
  address: AddressInput
  phone: String
  website: String
  company: CompanyInput
}

type User {
  id: ID
  name: String
  username: String
  email: String
  address: Address
  phone: String
  website: String
  company: Company
  posts(options: PageQueryOptions): PostsPage
  albums(options: PageQueryOptions): AlbumsPage
  todos(options: PageQueryOptions): TodosPage
}

type UsersPage {
  data: [User]
  links: PaginationLinks
  meta: PageMetadata
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
