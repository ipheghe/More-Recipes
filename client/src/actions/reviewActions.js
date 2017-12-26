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
 * @param {number} recipeId
 *
 * @returns {action} dispatch
 */
const getReviews = (recipeId) => {
  const url = `/reviews/${recipeId}`;
  return dispatch => getData(RETRIEVE_RECIPE_REVIEWS, REVIEW_ERROR, true, url, dispatch);
};

export { postReview, getReviews };
