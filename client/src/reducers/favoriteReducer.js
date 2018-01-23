import {
  FAVORITE_RECIPE,
  UNFAVORITE_RECIPE,
  RETRIEVE_USER_FAVORITE_RECIPE,
  RETRIEVE_USER_FAVORITE_RECIPES,
  FAVORITE_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  message: '',
  status: false,
  error: '',
  pages: 1,
  userFavorites: [],
  userFavorite: [],
};

/**
 * @description this Reducer implements the action for the favorite reducer
 *
 * @param {Object}  state - initial state
 * @param {Object} action - redux action
 *
 * @returns {Object} - current state
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FAVORITE_RECIPE:
      return {
        ...state,
        message: action.payload.message,
        status: true
      };
    case UNFAVORITE_RECIPE:
      return { ...state, status: false };
    case RETRIEVE_USER_FAVORITE_RECIPE:
      return {
        ...state,
        userFavorite: action.payload.userFavorite,
        message: action.payload.message,
        status: action.payload.status
      };
    case RETRIEVE_USER_FAVORITE_RECIPES:
      return {
        ...state,
        userFavorites: action.payload.userFavorites
          ? action.payload.userFavorites.rows : [],
        message: action.payload.message,
        pages: action.payload.pages
      };
    case FAVORITE_ERROR:
      return {
        ...state,
        error: action.payload.message
          ? action.payload.message : action.payload.error,
        status: action.payload.status ? action.payload.status : false
      };
    default:
      return state;
  }
};
