import { getData, postData, putData, deleteData } from './index';
import { FAVORITE_RECIPE, RETRIEVE_USER_FAVORITE_RECIPES, FAVORITE_ERROR } from './types';

//= ===============================
// Favorite actions
//= ===============================

const favoriteRecipe = ( recipeId, categoryId ) => {
  const data = { recipeId, categoryId };
  const url = `/recipes/${recipeId}/${categoryId}/favorites`;
  const directTo = '';
  const toastMessage = 'Recipe added to favorites Successfully';
  const constant = 'RECIPE_FAVORITED';
  return dispatch => postData(FAVORITE_RECIPE, FAVORITE_ERROR, true, url, dispatch, data, toastMessage, constant, directTo);
}

const getFavoriteRecipes = () => {
  const url = '/favorites';
  return dispatch => getData(RETRIEVE_USER_FAVORITE_RECIPES, FAVORITE_ERROR, true, url, dispatch);
}

export { favoriteRecipe, getFavoriteRecipes }