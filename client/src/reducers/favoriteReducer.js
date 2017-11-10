import { FAVORITE_RECIPE, RETRIEVE_USER_FAVORITE_RECIPES, FAVORITE_ERROR } from '../actions/types';

const INITIAL_STATE = { message: '', error: '', userFavorites: [], favoriteData: {} };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FAVORITE_RECIPE:
      return {
        ...state,
        message: action.payload.message,
        favoriteData: action.payload.favoriteData
      };
    case RETRIEVE_USER_FAVORITE_RECIPES:
      return { ...state, userFavorites: action.payload.userFavorites };
    case FAVORITE_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;


  }
};
