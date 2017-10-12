import { getData, postData, putData, deleteData } from './index';
import { ADD_RECIPE, FETCH_TOP_RECIPES, FETCH_FAVORITE_RECIPES, FETCH_USER_RECIPES, FETCH_RECIPE, UPDATE_RECIPE, DELETE_RECIPE, RECIPE_ERROR } from './types';
import { actions as toastrActions } from 'react-redux-toastr';
import { bindActionCreators } from 'redux';

//= ===============================
// Recipe actions
//= ===============================

const addRecipe = ( recipeName, recipeDescription, ingredients, directions ) => {
  const data = { recipeName, recipeDescription, ingredients, directions };
  const url = '/recipes';
  return dispatch => postData(ADD_RECIPE, RECIPE_ERROR, true, url, dispatch, data);
}

const updateRecipe = ( recipeId, recipeName, recipeDescription, ingredients, directions ) => {
  const data = { recipeName, recipeDescription, ingredients, directions };
  const url = `/recipes/${recipeId}`;
  return dispatch => putData(UPDATE_RECIPE, RECIPE_ERROR, true, url, dispatch, data);
}

const deleteRecipe = ( recipeId ) => {
  const url = `/recipes/${recipeId}`;
  return dispatch => deleteData(UPDATE_RECIPE, RECIPE_ERROR, true, url, dispatch);
}

const getTopRecipes = () => {
  const url = '/recipes?sort=upvotes&order=descending';
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
