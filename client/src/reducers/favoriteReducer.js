import {
  FAVORITE_RECIPE,
  UNFAVORITE_RECIPE,
  RETRIEVE_USER_FAVORITE_RECIPE,
  RETRIEVE_USER_FAVORITE_RECIPES,
  FAVORITE_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  message: '',
  error: '',
  pages: 1,
  userFavorites: [],
  favoriteData: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FAVORITE_RECIPE:
      return {
        ...state,
        message: action.payload.message,
        favoriteData: action.payload.favorite
      };
    case UNFAVORITE_RECIPE:
      return { ...state };
    case RETRIEVE_USER_FAVORITE_RECIPE:
      return {
        ...state,
        favoriteData: action.payload.userFavorite,
        message: action.payload.message
      };
    case RETRIEVE_USER_FAVORITE_RECIPES:
      return {
        ...state,
        userFavorites: action.payload.userFavorites ? action.payload.userFavorites.rows : [],
        message: action.payload.message,
        pages: action.payload.pages
      };
    case FAVORITE_ERROR:
      return {
        ...state,
        error: action.payload.message ? action.payload.message : action.payload.error
      };
    default:
      return state;
  }
};
