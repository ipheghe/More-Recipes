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
  userFavorites: [],
  favoriteData: {},
  text: ''
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
        userFavorites: action.payload.userFavorites,
        message: action.payload.message
      };
    case FAVORITE_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
