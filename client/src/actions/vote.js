import { putData } from './index';
import { UPVOTE_RECIPE, DOWNVOTE_RECIPE, VOTE_ERROR } from './types';

//= ===============================
// Vote actions
//= ===============================

/**
 * @description action to upvote recipes
 * @type {function} upvoteRecipe
 * @param {*} recipeId
 * @returns {array} dispatch
 */
const upvoteRecipe = (recipeId) => {
  const data = { recipeId };
  const url = `/recipes/${recipeId}/votes`;
  const directTo = '';
  const message = '';
  const constant = '';
  return dispatch => putData(
    UPVOTE_RECIPE,
    VOTE_ERROR,
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
 * @description action to downvote recipes
 * @type {function} upvoteRecipe
 * @param {*} recipeId
 * @returns {array} dispatch
 */
const downvoteRecipe = (recipeId) => {
  const data = { recipeId };
  const url = `/recipes/${recipeId}/votes?sort=downvotes`;
  const directTo = '';
  const message = '';
  const constant = '';
  return dispatch => putData(
    DOWNVOTE_RECIPE,
    VOTE_ERROR,
    true,
    url,
    dispatch,
    data,
    message,
    constant,
    directTo
  );
};

export { upvoteRecipe, downvoteRecipe };
