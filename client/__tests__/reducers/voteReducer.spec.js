import expect from 'expect';
import reducer from '../../src/reducers/voteReducer';
import {
  UPVOTE_RECIPE, DOWNVOTE_RECIPE, VOTE_ERROR
} from '../../src/actions/types';

let initialState = {};

describe('Vote reducer', () => {
  beforeEach(() => {
    initialState = {
      message: '',
      error: '',
      upvote: 0,
      downvote: 0
    };
  });
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle UPVOTE_RECIPE', () => {
    const upvoteRecipeAction = {
      type: UPVOTE_RECIPE,
      payload: {
        recipe: {
          upvotes: 1,
          downvotes: 0
        }
      }
    };
    expect(reducer(initialState, upvoteRecipeAction)).toEqual({
      message: '',
      error: '',
      upvote: upvoteRecipeAction.payload.recipe.upvotes,
      downvote: upvoteRecipeAction.payload.recipe.downvotes
    });
  });

  it('should handle DOWNVOTE_RECIPE', () => {
    const downvoteRecipeAction = {
      type: DOWNVOTE_RECIPE,
      payload: {
        recipe: {
          upvotes: 0,
          downvotes: 1
        }
      }
    };
    expect(reducer(initialState, downvoteRecipeAction)).toEqual({
      message: '',
      error: '',
      upvote: downvoteRecipeAction.payload.recipe.upvotes,
      downvote: downvoteRecipeAction.payload.recipe.downvotes
    });
  });
});

it('should handle VOTE_ERROR', () => {
  const voteErrorAction = {
    type: VOTE_ERROR,
    payload: {
      message: 'Error Placing Vote'
    }
  };
  expect(reducer(initialState, voteErrorAction)).toEqual({
    message: '',
    error: voteErrorAction.payload.message,
    upvote: 0,
    downvote: 0
  });
});
