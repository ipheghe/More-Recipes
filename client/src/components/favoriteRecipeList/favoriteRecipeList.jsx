import React from 'react';
import PropTypes from 'prop-types';
import FavoriteRecipeCard from '../favoriteRecipeCard/favoriteRecipeCard.jsx';

const FavoriteRecipeList = ({ recipes }) => (
  <div>
    {
        (recipes && recipes.length > 0) ?
          recipes.map(recipe => <FavoriteRecipeCard recipe={recipe} key={recipe.id} />)
          : null
      }
  </div>
);

FavoriteRecipeList.propTypes = {
  recipes: PropTypes.objectOf(PropTypes.object).isRequired
};

export default FavoriteRecipeList;
