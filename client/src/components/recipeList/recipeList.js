import React from 'react';
import RecipeCard from '../recipeCard/recipeCard';

const RecipeList = ({ recipes }) => {
  return (
    <div>
      {
        (recipes && recipes.length > 0) ?
          recipes.map((recipe, index) => <RecipeCard recipe={recipe} key={index} />)
          : null
      }
    </div>
  );
}
export default RecipeList;
