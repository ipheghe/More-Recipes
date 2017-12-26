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
  const directTo = '#myRecipe';
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
 * @type {function} updateRecipe
 *
 * @param {number} recipeId
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
  const directTo = '#myRecipe';
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
 * @type {function} deleteRecipe
 *
 * @param {number} recipeId
 *
 * @returns {action} dispatch
 */
const deleteRecipe = (recipeId) => {
  const url = `/recipe/${recipeId}`;
  const directTo = '';
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
    directTo
  );
};

/**
 * @description action to get top recipes
 * @type {function} getTopRecipes
 *
 * @returns {action} dispatch
 */
const getTopRecipes = () => {
  const url = '/topRecipes?sort=upvotes&order=descending';
  return dispatch => getData(FETCH_TOP_RECIPES, RECIPE_ERROR, true, url, dispatch);
};

/**
 * @description action to get user recipes
 * @type {function} getUserRecipes
 *
 * @returns {action} dispatch
 */
const getUserRecipes = () => {
  const url = '/recipes/users';
  return dispatch => getData(FETCH_USER_RECIPES, RECIPE_ERROR, true, url, dispatch);
};

/**
 * @description action to get a recipe
 * @type {function} getRecipe
 *
 * @param {number} id
 *
 * @returns {action} dispatch
 */
const getRecipe = (id) => {
  const url = `/recipe/${id}`;
  return dispatch => getData(FETCH_RECIPE, RECIPE_ERROR, true, url, dispatch);
};

/**
 * @description action to get searched recipes
 * @type {function} getRecipesBySearch
 *
 * @param {string} keyword
 *
 * @returns {action} dispatch
 */
const getRecipesBySearch = (keyword) => {
  const url = `/topRecipes?search=${keyword}`;
  return dispatch => getData(SEARCH_RECIPES, RECIPE_ERROR, true, url, dispatch);
};

export {
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getTopRecipes,
  getUserRecipes,
  getRecipe,
  getRecipesBySearch
};

