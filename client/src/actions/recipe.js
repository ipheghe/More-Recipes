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

//= ===============================
// Recipe actions
//= ===============================

/**
 * @description add recipe action
 * @type {function} addRecipe
 * @param {object} recipeName
 * @param {object} recipeDescription
 * @param {object} imageUrl
 * @param {object} ingredients
 * @param {object} directions
 * @returns {array} dispatch
 */
const addRecipe = (recipeName, recipeDescription, imageUrl, ingredients, directions) => {
  const data = { recipeName, recipeDescription, imageUrl, ingredients, directions };
  const url = '/recipes';
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
 * @description update recipe action
 * @type {function} updateRecipe
 * @param {object} recipeId
 * @param {object} recipeDescription
 * @param {object} ingredients
 * @param {object} directions
 * @returns {array} dispatch
 */
const updateRecipe = (recipeId, recipeDescription, ingredients, directions) => {
  const data = { recipeDescription, ingredients, directions };
  const url = `/recipes/${recipeId}`;
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
 * @param {object} recipeId
 * @returns {array} dispatch
 */
const deleteRecipe = (recipeId) => {
  const url = `/recipes/${recipeId}`;
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
 * @returns {array} dispatch
 */
const getTopRecipes = () => {
  const url = '/topRecipes?sort=upvotes&order=descending';
  return dispatch => getData(FETCH_TOP_RECIPES, RECIPE_ERROR, true, url, dispatch);
};

/**
 * @description action to get user recipes
 * @type {function} getUserRecipes
 * @returns {array} dispatch
 */
const getUserRecipes = () => {
  const url = '/recipes/users';
  return dispatch => getData(FETCH_USER_RECIPES, RECIPE_ERROR, true, url, dispatch);
};

/**
 * @description action to get top recipes
 * @type {function} getRecipe
 * @param {object} id
 * @returns {array} dispatch
 */
const getRecipe = id => {
  const url = `/recipes/${id}`;
  return dispatch => getData(FETCH_RECIPE, RECIPE_ERROR, true, url, dispatch);
};

/**
 * @description action to get searched recipes
 * @type {function} getRecipesBySearch
 * @param {object} keyword
 * @returns {array} dispatch
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

