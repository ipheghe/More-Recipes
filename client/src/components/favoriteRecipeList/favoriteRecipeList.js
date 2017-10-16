import React from 'react';
import FavoriteRecipeCard from '../favoriteRecipeCard/favoriteRecipeCard';

const FavoriteRecipeList = ({ recipes }) => {
  console.log(recipes, 'ghh')
  return (
    <div>
      {
        (recipes && recipes.length > 0) ?
          recipes.map((recipe, index) => <FavoriteRecipeCard recipe={recipe} key={index} />)
          : null
      }
    </div>
  );
}
export default FavoriteRecipeList;
