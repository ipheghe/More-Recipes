import {
  getData,
  postData,
  deleteData
} from './index';
import {
  FAVORITE_RECIPE,
  UNFAVORITE_RECIPE,
  RETRIEVE_USER_FAVORITE_RECIPE,
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
  const toastMessage = '';
  const constant = '';
  return dispatch => postData(
    FAVORITE_RECIPE,
    FAVORITE_ERROR,
    true,
    url,
    dispatch,
    data,
    toastMessage,
    constant,
    directTo
  );
};

/**
 * @description favorite recipe action
 * @type {function} favoriteRecipe
 * @param {object} recipeId
 * @param {object} categoryId
 * @returns {array} dispatch
 */
const unfavoriteRecipe = (recipeId) => {
  const url = `/favorites/${recipeId}`;
  const directTo = '';
  const toastMessage = '';
  const constant = '';
  return dispatch => deleteData(
    UNFAVORITE_RECIPE,
    FAVORITE_ERROR,
    true,
    url,
    dispatch,
    toastMessage,
    constant,
    directTo
  );
};

/**
 * @description action to get user favorite recipe
 * @type {function} getFavoriteRecipe
 * @param {object} recipeId
 * @returns {array} dispatch
 */
const getFavoriteRecipe = (recipeId) => {
  const url = `/favorite/${recipeId}`;
  return dispatch => getData(RETRIEVE_USER_FAVORITE_RECIPE, FAVORITE_ERROR, true, url, dispatch);
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
  unfavoriteRecipe,
  getFavoriteRecipe,
  getFavoriteRecipes
};
