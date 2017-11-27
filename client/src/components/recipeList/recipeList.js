import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../recipeCard/recipeCard';

const RecipeList = ({ recipes }) => (
  <div>
    {
        recipes && recipes.length > 0 ?
          recipes.map(recipe => <RecipeCard recipe={recipe} key={recipe.id} />)
          : null
      }
  </div>
);

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default RecipeList;
