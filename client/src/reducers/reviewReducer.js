import { REVIEW_RECIPE, RETRIEVE_RECIPE_REVIEWS, REVIEW_ERROR }
  from '../actions/types';

const INITIAL_STATE = {
  message: '', error: '', count: 1, reviewList: []
};

/**
 * @description this Reducer implements the action for the review reducer
 *
 * @param {Object}  state - initial state
 * @param {Object} action - redux action
 *
 * @returns {Object} - current state
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REVIEW_RECIPE:
      return {
        ...state,
        message: action.payload.message,
        reviewList: [...state.reviewList, action.payload.review],
        count: state.count + 1
      };
    case RETRIEVE_RECIPE_REVIEWS:
      return {
        ...state,
        reviewList: action.payload.reviews
          ? action.payload.reviews.rows : [],
        count: action.payload.reviews
          ? action.payload.reviews.count : 0
      };
    case REVIEW_ERROR:
      return {
        ...state,
        error: action.payload.message
          ? action.payload.message : action.payload.error
      };
    default:
      return state;
  }
};
