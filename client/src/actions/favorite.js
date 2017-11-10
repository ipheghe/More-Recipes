import {
  getData,
  postData
} from './index';
import {
  FAVORITE_RECIPE,
  RETRIEVE_USER_FAVORITE_RECIPES,
  FAVORITE_ERROR
} from './types';

//= ===============================
// Favorite actions
//= ===============================
/**
 * @description favorite recipe action
 * @type {function} favoriteRecipe
 * @param {object} recipeId
 * @param {object} categoryId
 * @returns {array} dispatch
 */
const favoriteRecipe = (recipeId, categoryId) => {
  const data = {
    recipeId,
    categoryId
  };
  const url = `/recipes/${recipeId}/${categoryId}/favorites`;
  const directTo = '';
  const toastMessage = 'Recipe added to favorites Successfully';
  const constant = 'RECIPE_FAVORITED';
  return dispatch => postData(FAVORITE_RECIPE,
    FAVORITE_ERROR,
    true,
    url,
    dispatch,
    data,
    toastMessage,
    constant,
    directTo);
};

/**
 * @description action to get user favorite recipes
 * @type {function} getFavoriteRecipes
 * @returns {array} dispatch
 */
const getFavoriteRecipes = () => {
  const url = '/favorites';
  return dispatch => getData(RETRIEVE_USER_FAVORITE_RECIPES, FAVORITE_ERROR, true, url, dispatch);
};

export {
  favoriteRecipe,
  getFavoriteRecipes
};
