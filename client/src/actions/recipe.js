import { getData, postData, putData, deleteData } from './index';
import {
  ADD_RECIPE,
  FETCH_TOP_RECIPES,
  FETCH_FAVORITE_RECIPES,
  FETCH_USER_RECIPES,
  FETCH_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  RECIPE_ERROR,
  IMAGE_FILE_REQUEST,
  IMAGE_FILE_SUCCESSFUL,
  IMAGE_FILE_FAILURE,
} from './types';
import { actions as toastrActions } from 'react-redux-toastr';
import { bindActionCreators } from 'redux';
import sha1 from 'sha1';
import superagent from 'superagent';

//= ===============================
// Recipe actions
//= ===============================

const addRecipe = (recipeName, recipeDescription, imageUrl, ingredients, directions) => {
  const data = { recipeName, recipeDescription, imageUrl, ingredients, directions };
  const url = '/recipes';
  const directTo = '#myRecipe';
  const message = 'Recipe added Successfully';
  const constant = 'RECIPE_ADDED';
  return dispatch => postData(ADD_RECIPE, RECIPE_ERROR, true, url, dispatch, data, message, constant, directTo);
}

const updateRecipe = (recipeId, recipeDescription, ingredients, directions) => {
  const data = { recipeName, recipeDescription, ingredients, directions };
  const url = `/recipes/${recipeId}`;
  const directTo = '#myRecipe';
  const message = 'Recipe updated Successfully';
  const constant = 'RECIPE_UPDATED';
  return dispatch => putData(UPDATE_RECIPE, RECIPE_ERROR, true, url, dispatch, data, message, constant, directTo);
}

const deleteRecipe = (recipeId) => {
  const url = `/recipes/${recipeId}`;
  const directTo = '';
  const message = 'Recipe deleted Successfully';
  const constant = 'RECIPE_DELETED';
  return dispatch => deleteData(UPDATE_RECIPE, RECIPE_ERROR, true, url, dispatch, message, constant, directTo);
}

const getTopRecipes = () => {
  const url = '/topRecipes?sort=upvotes&order=descending';
  return dispatch => getData(FETCH_TOP_RECIPES, RECIPE_ERROR, true, url, dispatch);
}

const getUserRecipes = () => {
  const url = '/recipes/users';
  return dispatch => getData(FETCH_USER_RECIPES, RECIPE_ERROR, true, url, dispatch);
}

const getRecipe = id => {
  const url = `/recipes/${id}`;
  return dispatch => getData(FETCH_RECIPE, RECIPE_ERROR, true, url, dispatch);
}
export { addRecipe, updateRecipe, deleteRecipe, getTopRecipes, getUserRecipes, getRecipe };

