const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const recipeSchema = new Schema({
  recipeName: {
    type: String,
    required: 'Name your recipe!',
    minlength: 1,
    maxlength: 50,
    trim: true,
  },
  contributor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
  ingredients: {
    type: String,
    required: 'What are the ingredients!?!?!',
    minlength: 1,
    maxlength: 500,
    trim: true,
  },
  directions: {
    type: String,
    required: 'Directions!?!?!',
    minlength: 1,
    maxlength: 500,
    trim: true,
  },
  extras: {
    type: String,
    required: 'Any extras!?!?!',
    minlength: 1,
    maxlength: 500,
    trim: true,
  }
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;
