import { REVIEW_RECIPE, RETRIEVE_RECIPE_REVIEWS, REVIEW_ERROR } from '../actions/types';

const INITIAL_STATE = { message: '', error: '', reviewList: [], reviewData: {} };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REVIEW_RECIPE:
      return {...state, message: action.payload.message, reviewData: action.payload.reviewData };
    case RETRIEVE_RECIPE_REVIEWS:
      return { ...state, reviewList: action.payload.reviewList };
    case REVIEW_ERROR:
      return { ...state, error: action.payload };
  }

  return state;
}