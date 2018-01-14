import { putData } from './index';
import { UPVOTE_RECIPE, DOWNVOTE_RECIPE, VOTE_ERROR } from './types';

/**
 * @description action to upvote recipe
 *
 * @type {function} upvoteRecipe
 *
 * @param {number} recipeId
 *
 * @returns {action} dispatch
 */
const upvoteRecipe = (recipeId) => {
  const data = { recipeId };
  const url = `/recipe/${recipeId}/vote`;
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
 * @description action to downvote recipe
 *
 * @type {function} upvoteRecipe
 *
 * @param {number} recipeId
 *
 * @returns {action} dispatch
 */
const downvoteRecipe = (recipeId) => {
  const data = { recipeId };
  const url = `/recipe/${recipeId}/vote?sort=downvotes`;
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
