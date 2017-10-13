import { getData, postData, putData, deleteData } from './index';
import { REVIEW_RECIPE, RETRIEVE_RECIPE_REVIEWS, REVIEW_ERROR } from './types';
import { bindActionCreators } from 'redux';
import axios from 'axios';

//= ===============================
// Review actions
//= ===============================

const postReview = ( message, recipeId ) => {
  const data = { message, recipeId };
  const url = `/recipes/${recipeId}/reviews`;
  const directTo = '';
  const toastMessage = 'Review posted Successfully';
  const constant = 'REVIEW_POSTED';
  return dispatch => postData(REVIEW_RECIPE, REVIEW_ERROR, true, url, dispatch, data, toastMessage, constant, directTo);
}

const getReviews = ( recipeId ) => {
  const url = `/reviews/${recipeId}`;
  console.log(recipeId, '==================>')
  return dispatch => getData(RETRIEVE_RECIPE_REVIEWS, REVIEW_ERROR, true, url, dispatch);
}

export { postReview, getReviews }