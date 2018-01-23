import React from 'react';
import PropTypes from 'prop-types';
import FavoriteRecipeCard from './FavoriteRecipeCard';

/**
 * FavoriteRecipeList component
 *
 * @param {Object} props
 *
 * @return {jsx} jsx
 */
const FavoriteRecipeList = ({ recipes }) => (
  <div>
    {
        recipes && recipes.length > 0 ?
          recipes.map(recipe =>
            <FavoriteRecipeCard recipe={recipe} key={recipe.Recipe.id} />)
          : null
      }
  </div>
);

FavoriteRecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default FavoriteRecipeList;
