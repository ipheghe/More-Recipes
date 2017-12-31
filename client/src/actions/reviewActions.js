import { getData, postData } from './index';
import { REVIEW_RECIPE, RETRIEVE_RECIPE_REVIEWS, REVIEW_ERROR } from './types';

/**
* @description post review action
 * @type {function} postReview
 *
 * @param {string} message
 * @param {number} recipeId
 *
 * @returns {action} dispatch
 */
const postReview = (message, recipeId) => {
  const data = { message, recipeId };
  const url = `/recipe/${recipeId}/review`;
  const directTo = '';
  const toastMessage = '';
  const constant = '';
  return dispatch => postData(
    REVIEW_RECIPE,
    REVIEW_ERROR,
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
* @description get reviews action
 * @type {function} getReviews
 *
 * @param {integer} recipeId
 * @param {integer} limit
 *
 * @returns {action} dispatch
 */
const getReviews = (recipeId, limit) => {
  const data = {
    limit
  };
  const url = `/reviews/${recipeId}`;
  const directTo = '';
  const message = '';
  const constant = '';
  return dispatch => postData(
    RETRIEVE_RECIPE_REVIEWS,
    REVIEW_ERROR,
    true,
    url,
    dispatch,
    data,
    message,
    constant,
    directTo
  );
};

export { postReview, getReviews };
