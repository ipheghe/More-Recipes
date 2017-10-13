import { getData, postData, putData, deleteData } from './index';
import { UPVOTE_RECIPE, DOWNVOTE_RECIPE, VOTE_ERROR } from './types';
import { actions as toastrActions } from 'react-redux-toastr';
import { bindActionCreators } from 'redux';

//= ===============================
// Vote actions
//= ===============================

const upvoteRecipe = ( recipeId ) => {
  const data = { recipeId };
  const url = `/recipes/${recipeId}/votes`;
  const directTo = '';
  const message = 'Recipe upvoted Successfully';
  const constant = 'RECIPE_UPVOTED';
  return dispatch => putData(UPVOTE_RECIPE, VOTE_ERROR, true, url, dispatch, data, message, constant, directTo);
}

const downvoteRecipe = ( recipeId ) => {
  const data = { recipeId };
  const url = `/recipes/${recipeId}/votes?sort=downvotes`;
  const directTo = '';
  const message = 'Recipe downvoted Successfully';
  const constant = 'RECIPE_DOWNVOTED';
  return dispatch => putData(DOWNVOTE_RECIPE, VOTE_ERROR, true, url, dispatch,data, message, constant, directTo);
}

export { upvoteRecipe, downvoteRecipe }