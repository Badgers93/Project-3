import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

const CommentForm = ({ recipeId }) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          recipeId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div
    style={{backgroundColor:'white', color: 'black'}}
    >
      <h4
      >What do you think about this recipe?</h4>

      {Auth.loggedIn() ? (
        <>
          <p
          style={{backgroundColor:'white'}}
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center m-3 p-3"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-md-6">
              <textarea
                name="commentText"
                placeholder="Add your comment..."
                value={commentText}
                className="form-input w-100"
                style={{ lineHeight: '2', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-6 col-md-6">
              <button 
              style={{backgroundColor: 'black', color: 'white'}} 
              className="btn btn-block py-3" type="submit">
                Add Comment
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your recipes. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">Sign Up.</Link>
        </p>
      )}
    </div>
  );
};

export default CommentForm;
