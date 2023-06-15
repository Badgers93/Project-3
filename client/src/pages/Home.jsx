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
      <div style={{backgroundColor: 'orange'}} className="flex-row justify-left">
        <div
          className="col-10 col-md-10 mb-3 p-3"
          style={{ border: '1px solid #00000' }}
        >
          <RecipeForm />
        </div>
        <div className="col-12 col-md-12 mb-5">
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
