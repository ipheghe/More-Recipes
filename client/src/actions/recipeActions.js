import { getData, postData, putData, deleteData } from './index';
import {
  ADD_RECIPE,
  FETCH_TOP_RECIPES,
  FETCH_USER_RECIPES,
  SEARCH_RECIPES,
  FETCH_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  RECIPE_ERROR,
} from './types';

/**
 * @description add recipe action
 *
 * @type {function} addRecipe
 *
 * @param {string} name
 * @param {string} description
 * @param {string} imageUrl
 * @param {string} ingredients
 * @param {string} directions
 *
 * @returns {action} dispatch
 */
const addRecipe = (name, description, imageUrl, ingredients, directions) => {
  const data = {
    name, description, imageUrl, ingredients, directions
  };
  const url = '/recipe';
  const directTo = '#dashboard/my-recipes';
  const message = 'Recipe added Successfully';
  const constant = 'RECIPE_ADDED';
  return dispatch => postData(
    ADD_RECIPE,
    RECIPE_ERROR,
    true,
    url,
    dispatch,
    data,
    message,
    constant,
    directTo
  );
};

/**
 * Update Recipe
 * @description update recipe action
 *
 * @type {function} updateRecipe
 *
 * @param {integer} recipeId
 * @param {string} name
 * @param {string} description
 * @param {string} ingredients
 * @param {string} directions
 * @param {string} imageUrl
 *
 * @returns {action} dispatch
 */
const updateRecipe = (
  recipeId,
  name,
  description,
  ingredients,
  directions,
  imageUrl
) => {
  const data = {
    name,
    description,
    ingredients,
    directions,
    imageUrl
  };
  const url = `/recipe/${recipeId}`;
  const directTo = '#dashboard/my-recipes';
  const message = 'Recipe updated Successfully';
  const constant = 'RECIPE_UPDATED';
  return dispatch => putData(
    UPDATE_RECIPE,
    RECIPE_ERROR,
    true,
    url,
    dispatch,
    data,
    message,
    constant,
    directTo
  );
};

/**
 * @description delete recipe action
 *
 * @type {function} deleteRecipe
 *
 * @param {integer} recipeId
 *
 * @returns {action} dispatch
 */
const deleteRecipe = (recipeId) => {
  const url = `/recipe/${recipeId}`;
  const message = 'Recipe deleted Successfully';
  const constant = 'RECIPE_DELETED';
  return dispatch => deleteData(
    DELETE_RECIPE,
    RECIPE_ERROR,
    true,
    url,
    dispatch,
    message,
    constant,
  );
};

/**
 * @description action to get top recipes
 *
 * @type {function} getTopRecipes
 *
 * @returns {action} dispatch
 */
const getTopRecipesLanding = () => {
  const url = '/topRecipes?sort=upvotes&order=descending';
  return dispatch => getData(
    FETCH_TOP_RECIPES,
    RECIPE_ERROR,
    true,
    url,
    dispatch
  );
};

/**
 * @description action to get top recipes
 *
 * @type {function} getTopRecipes
 *
 * @param {integer} offset
 *
 * @returns {action} dispatch
 */
const getTopRecipes = (offset) => {
  const data = {
    offset
  };
  const url = '/recipes?sort=upvotes&order=descending';
  const directTo = '';
  const message = '';
  const constant = '';
  return dispatch => postData(
    FETCH_TOP_RECIPES,
    RECIPE_ERROR,
    true,
    url,
    dispatch,
    data,
    message,
    constant,
    directTo
  );
};

/**
 * @description action to get user recipes
 *
 * @type {function} getUserRecipes
 *
 * @param {integer} offset
 *
 * @returns {action} dispatch
 */
const getUserRecipes = (offset) => {
  const data = {
    offset
  };
  const url = '/recipes/users';
  const directTo = '';
  const message = '';
  const constant = '';
  return dispatch => postData(
    FETCH_USER_RECIPES,
    RECIPE_ERROR,
    true,
    url,
    dispatch,
    data,
    message,
    constant,
    directTo
  );
};

/**
 * @description action to get a recipe
 *
 * @type {function} getRecipe
 *
 * @param {integer} id
 *
 * @returns {action} dispatch
 */
const getRecipe = (id) => {
  const url = `/view-recipe/${id}`;
  return dispatch => getData(FETCH_RECIPE, RECIPE_ERROR, true, url, dispatch);
};

/**
 * @description action to get searched recipes
 *
 * @type {function} getRecipesBySearch
 *
 * @param {string} keyword
 * @param {integer} offset
 *
 * @returns {action} dispatch
 */
const getRecipesBySearch = (keyword, offset) => {
  const data = {
    offset
  };
  const url = `/recipes?search=${keyword}`;
  const directTo = '';
  const message = '';
  const constant = '';
  return dispatch => postData(
    SEARCH_RECIPES,
    RECIPE_ERROR,
    true,
    url,
    dispatch,
    data,
    message,
    constant,
    directTo
  );
};

export {
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getTopRecipes,
  getUserRecipes,
  getRecipe,
  getRecipesBySearch,
  getTopRecipesLanding
};

