import { UPVOTE_RECIPE, DOWNVOTE_RECIPE, VOTE_ERROR } from '../actions/types';

const INITIAL_STATE = { message: '', error: '', recipe: {}, upvote: 0, downvote: 0 };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPVOTE_RECIPE:
    console.log(action.payload.recipe.upvotes, 'upvotes');
      return {...state, recipe: Object.assign({}, action.payload.recipe), upvote: action.payload.upvote };
    case DOWNVOTE_RECIPE:
    console.log(action.payload.recipe.downvotes, 'downvotes');
      return { ...state, recipe: Object.assign({}, action.payload.recipe), downvote: action.payload.downvote };
    case VOTE_ERROR:
      return { ...state, error: action.payload };
  }

  return state;
}