import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_RECIPE } from '../../utils/mutations';
import { QUERY_RECIPES, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const RecipeForm = () => {
  const [thoughtText, setThoughtText] = useState('');
  
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [directions, setDirections] = useState('');
  const [extras, setExtras] = useState('');


  const [addRecipe, { error }] = useMutation(ADD_RECIPE, {
    update(cache, { data: { addRecipe } }) {
      try {
        const { recipes } = cache.readQuery({ query: QUERY_RECIPES });

        cache.writeQuery({
          query: QUERY_RECIPES,
          data: { recipes: [addRecipe, ...recipes] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME }) || {me:{ recipes:[]}};
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, recipes: [...me.recipes, addRecipe] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addRecipe({
        variables: {
          recipeName,
          ingredients,
          directions,
          extras
        },
      });

      setDirections('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'directions' && value.length <= 500) {
      setDirections(value);
     
    }
    else if(name === "recipeName"){
      setRecipeName(value);

    }
    else if(name === "ingredients"){
      setIngredients(value);
    }
    else if(name === "extras"){
      setExtras(value);
    }
  };

  return (
    <div>
      <h3
      className='p-3 my-3'
      style={{backgroundColor:'orange', color: 'white'}}
      >Got any tasty recipes?
      </h3>

      {Auth.loggedIn() ? (
        <>
          <form
           style={{backgroundColor:'black', color: 'white'}}
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-md-9 my-3 p-3">
              <textarea
                name="recipeName"
                placeholder="Recipe Name"
                value={recipeName}
                className="form-input w-100"
                style={{ lineHeight: '2', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
              <textarea
                name="ingredients"
                placeholder="Ingredients"
                value={ingredients}
                className="form-input w-100"
                style={{ lineHeight: '2', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
              <textarea
                name="directions"
                placeholder="Directions"
                value={directions}
                className="form-input w-100"
                style={{ lineHeight: '2', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
              <textarea
                name="extras"
                placeholder="Extras"
                value={extras}
                className="form-input w-100"
                style={{ lineHeight: '2', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button 
              style={{backgroundColor: 'orange', color: 'white'}}
              className="btn btn-block py-3" type="submit">
                Add Recipe
              </button>
            </div>
            {error && (
              <div className="col-12 my-12 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
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

export default RecipeForm;
