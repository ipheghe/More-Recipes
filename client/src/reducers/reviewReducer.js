import { REVIEW_RECIPE, RETRIEVE_RECIPE_REVIEWS, REVIEW_ERROR } from '../actions/types';

const INITIAL_STATE = {
  message: '', error: '', count: 1, reviewList: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REVIEW_RECIPE:
      return {
        ...state,
        message: action.payload.message,
        reviewList: [...state.reviewList, action.payload.review]
      };
    case RETRIEVE_RECIPE_REVIEWS:
      return {
        ...state,
        reviewList: action.payload.reviews.rows,
        count: action.payload.reviews.count
      };
    case REVIEW_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
