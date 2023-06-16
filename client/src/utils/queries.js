import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      recipes {
        _id
        recipeText
        createdAt
      }
    }
  }
`;

export const QUERY_RECIPES = gql`
  query Query {
    recipes {
      _id
      createdAt
      directions
      extras
      ingredients
      recipeName
      contributor
    }
  }
`;

export const QUERY_SINGLE_RECIPE = gql`
  query getSingleRecipe($recipeId: ID!) {
    recipe(recipeId: $recipeId) {
      _id
      createdAt
      directions
      extras
      ingredients
      recipeName
      contributor
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
query Query {
  me {
    _id
    email
    password
    recipes {
      directions
      createdAt
      contributor
      _id
      extras
      ingredients
      recipeName
      comments {
        _id
        commentAuthor
        commentText
        createdAt
      }
    }
    username
  }
}
`;
