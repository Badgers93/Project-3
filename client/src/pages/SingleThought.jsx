import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_THOUGHT } from '../utils/queries';

const SingleThought = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    // pass URL parameter
    variables: { thoughtId: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 
      style={{backgroundColor: 'black', color: 'white'}}
      className="card-header p-3 m-0 align-items">
        {thought.thoughtAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
        {thought.createdAt}
        </span>
      </h3>
      <div className="py-3">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'normal',
            border: '1px solid #1a1a1a',
            lineHeight: '2.0',
            backgroundColor: 'white'
          }}
        >
          {thought.thoughtText}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={thought.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px solid #1a1a1a' }}>
        <CommentForm thoughtId={thought._id} />
      </div>
    </div>
  );
};

export default SingleThought;
