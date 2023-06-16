import React from 'react';
import { Link } from 'react-router-dom';

const RecipeList = ({
  recipes = [],
  showUsername = true
}) => {
  if (!recipes.length) {
    return <h3 >No Recipes Yet</h3>;
  }

  return (
    <div>
      {recipes &&
        recipes.map((recipe) => (
          <div key={recipe._id} className="card mb-3">
            <h4 
            style={{backgroundColor: 'black', color: 'white'}}
            className="card-header p-3 m-0">
              {showUsername ? (
                <Link
                  style={{color: 'white'}}
                  to={`/profiles/${recipe.contributor}`}
                >
                  {recipe.contributor} <br />
                  <span style={{ fontSize: '1rem' }}>
                  Posted: {recipe.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                  posted: {recipe.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div 
            style={{backgroundColor:'lightgray'}}
            className="card-body p-2">
              <p>{recipe.recipeName}</p>
              <p>{recipe.ingredients}</p>
              <p>{recipe.directions}</p>
              <p>{recipe.extras}</p>
            </div>
            <Link
            style={{backgroundColor: 'black', color: 'white'}}
              className="btn btn-block btn-squared"
              to={`/recipes/${recipe._id}`}
            >
              Join the discussion on this recipe.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default RecipeList;
