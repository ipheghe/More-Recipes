import React from 'react';
import PropTypes from 'prop-types';
import LandingRecipeCard from './LandingRecipeCard';

/**
 * LandingRecipeList component
 *
 * @param {Object} props
 *
 * @return {jsx} jsx
 */
const LandingRecipeList = ({ recipes }) => (
  <div>
    {
        recipes && recipes.length > 0 ?
          recipes.map(recipe =>
            <LandingRecipeCard recipe={recipe} key={recipe.id} />)
          : null
      }
  </div>
);

LandingRecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default LandingRecipeList;
