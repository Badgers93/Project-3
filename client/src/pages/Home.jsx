import React from 'react';
import { useQuery } from '@apollo/client';

import RecipeList from '../components/RecipeList';
import RecipeForm from '../components/RecipeForm';

import { QUERY_RECIPES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_RECIPES);
  const recipes = data?.recipes || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <RecipeForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <RecipeList
              recipes={recipes}
              title="Some Feed for Recipes(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
