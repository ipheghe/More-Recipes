import { UPVOTE_RECIPE, DOWNVOTE_RECIPE, VOTE_ERROR } from '../actions/types';

const INITIAL_STATE = {
  message: '', error: '', recipe: {}, upvote: 0, downvote: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPVOTE_RECIPE:
      return { ...state, recipe: action.payload.recipe, upvote: action.payload.upvote };
    case DOWNVOTE_RECIPE:
      return { ...state, recipe: action.payload.recipe, downvote: action.payload.downvote };
    case VOTE_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
