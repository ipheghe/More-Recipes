import { UPVOTE_RECIPE, DOWNVOTE_RECIPE, VOTE_ERROR } from '../actions/types';

const INITIAL_STATE = {
  message: '', error: '', upvote: 0, downvote: 0
};

/**
 * @description this Reducer implements the action for the vote reducer
 *
 * @param {Object}  state - initial state
 * @param {Object} action - redux action
 *
 * @returns {Object} - current state
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPVOTE_RECIPE:
      return {
        ...state,
        upvote: action.payload.recipe.upvotes,
        downvote: action.payload.recipe.downvotes
      };
    case DOWNVOTE_RECIPE:
      return {
        ...state,
        downvote: action.payload.recipe.downvotes,
        upvote: action.payload.recipe.upvotes,
      };
    case VOTE_ERROR:
      return {
        ...state,
        error: action.payload.message
          ? action.payload.message : action.payload.error
      };
    default:
      return state;
  }
};
