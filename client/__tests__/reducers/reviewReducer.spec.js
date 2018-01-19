import expect from 'expect';
import reducer from '../../src/reducers/reviewReducer';
import {
  REVIEW_RECIPE, RETRIEVE_RECIPE_REVIEWS, REVIEW_ERROR
} from '../../src/actions/types';
import mockItems from '../__mocks__/mockItems';

let initialState = {};

describe('Review reducer', () => {
  beforeEach(() => {
    initialState = {
      message: '',
      error: '',
      count: 1,
      reviewList: []
    };
  });
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle REVIEW_RECIPE', () => {
    const reviewRecipeAction = {
      type: REVIEW_RECIPE,
      payload: {
        message: 'Review Posted Successfully',
        review: mockItems.review
      }
    };
    expect(reducer(initialState, reviewRecipeAction)).toEqual({
      message: reviewRecipeAction.payload.message,
      error: '',
      count: 2,
      reviewList: [...initialState, reviewRecipeAction.payload.review]
    });
  });

  it('should handle RETRIEVE_RECIPE_REVIEWS', () => {
    const retrieveReviewRecipesAction = {
      type: RETRIEVE_RECIPE_REVIEWS,
      payload: {
        reviews: {
          count: 1,
          rows: [mockItems.review]
        }
      }
    };
    expect(reducer(initialState, retrieveReviewRecipesAction)).toEqual({
      message: '',
      error: '',
      count: retrieveReviewRecipesAction.payload.reviews.count,
      reviewList: retrieveReviewRecipesAction.payload.reviews.rows
    });
  });

  it('should handle REVIEW_ERROR', () => {
    const reviewErrorAction = {
      type: REVIEW_ERROR,
      payload: {
        message: 'No review for this recipe!'
      }
    };
    expect(reducer(initialState, reviewErrorAction)).toEqual({
      message: '',
      error: reviewErrorAction.payload.message,
      count: 1,
      reviewList: []
    });
  });
});
