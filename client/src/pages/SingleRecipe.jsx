import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_RECIPE } from '../utils/queries';

const SingleRecipe = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { recipeId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_RECIPE, {
    // pass URL parameter
    variables: { recipeId: recipeId },
  });

  const recipe = data?.recipe || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-black text-white p-2 m-0">
        {recipe.contributor} <br />
        <span style={{ fontSize: '1rem' }}>
          posted:{recipe.createdAt}
        </span>
      </h3>
      <div 
      style={{border: '2px solid #1A1A1A', backgroundColor: 'lightgray'}}
      className="py-4">
        <blockquote
          className="p-4"
          
      style={{
            backgroundColor: 'lightgray',
            fontSize: '2rem',
            fontStyle: 'normal',
            lineHeight: '1.5',
      }}
        >
          {recipe.recipeName}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={recipe.comments} />
      </div>
 style

      <div className="m-3 p-4" style={{ border: '1px solid #1a1a1a', color: 'white' }}>
     
main
        <CommentForm recipeId={recipe._id} />
      </div>
    </div>
  );
};

export default SingleRecipe;
