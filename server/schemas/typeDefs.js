const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    recipes: [Recipe]!
  }

  type Recipe {
    _id: ID
    recipeName: String
    contributor: String
    createdAt: String
    comments: [Comment]!
    ingredients: String
    directions: String
    extras: String
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
    recipeId: [Recipe]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    recipes(username: String): [Recipe]
    recipe(recipeId: ID!): Recipe
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRecipe(recipeName: String!, ingredients: String!, directions: String!, extras: String!): Recipe
    addComment(recipeId: ID!, commentText: String!): Recipe
    removeRecipe(recipeId: ID!): Recipe
    removeComment(recipeId: ID!, commentId: ID!): Recipe
  }
`;

module.exports = typeDefs;
