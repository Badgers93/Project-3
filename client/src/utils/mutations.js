import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_RECIPE = gql`
  mutation AddRecipe($recipeName: String!, $ingredients: String!, $directions: String!, $extras: String!) {
  addRecipe(recipeName: $recipeName, ingredients: $ingredients, directions: $directions, extras: $extras) {
    contributor
    createdAt
    directions
    extras
    ingredients
    recipeName
    _id
    comments {
      createdAt
      commentText
      commentAuthor
      _id
    }
  }
}
`;

export const ADD_COMMENT = gql`
  mutation addComment($recipeId: ID!, $commentText: String!) {
    addComment(recipeId: $recipeId, commentText: $commentText) {
      _id
      recipeName
      contributor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
