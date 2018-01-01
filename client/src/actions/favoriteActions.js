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

/**
 * @description favorite recipe action
 * @type {function} favoriteRecipe
 *
 * @param {number} recipeId
 * @param {number} categoryId
 *
 * @returns {action} dispatch
 */
const favoriteRecipe = (recipeId, categoryId) => {
  const data = {
    recipeId,
    categoryId
  };
  const url = `/recipe/${recipeId}/${categoryId}/favorite`;
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
 *
 * @param {number} recipeId
 * @param {number} categoryId
 *
 * @returns {action} dispatch
 */
const unfavoriteRecipe = (recipeId) => {
  const url = `/favorite/${recipeId}`;
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
 *
 * @param {number} recipeId
 *
 * @returns {action} dispatch
 */
const getFavoriteRecipe = (recipeId) => {
  const url = `/favorite/${recipeId}`;
  return dispatch => getData(RETRIEVE_USER_FAVORITE_RECIPE, FAVORITE_ERROR, true, url, dispatch);
};

/**
 * @description action to get user favorite recipes
 * @type {function} getFavoriteRecipes
 *
 * @returns {action} dispatch
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
