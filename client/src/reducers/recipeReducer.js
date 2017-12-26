import {
  ADD_RECIPE,
  FETCH_TOP_RECIPES,
  FETCH_USER_RECIPES,
  SEARCH_RECIPES,
  FETCH_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  RECIPE_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  message: '',
  error: '',
  recipeData: {},
  recipeList: [],
  userRecipes: [],
  searchResult: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_RECIPE:
      return {
        ...state,
        message: action.payload.message
      };
    case FETCH_TOP_RECIPES:
      return {
        ...state,
        recipeList: action.payload.recipes.rows,
        message: action.payload.message
      };
    case SEARCH_RECIPES:
      return {
        ...state,
        searchResult: action.payload.recipes.rows,
        message: action.payload.message
      };
    case FETCH_USER_RECIPES:
      return {
        ...state,
        userRecipes: action.payload.recipes.rows,
        message: action.payload.message
      };
    case FETCH_RECIPE:
      return {
        ...state,
        recipeData: action.payload.recipe,
        message: action.payload.message
      };
    case UPDATE_RECIPE:
      return {
        ...state,
        message: action.payload.message
      };
    case DELETE_RECIPE:
      return {
        ...state,
        message: action.payload.message
      };
    case RECIPE_ERROR:
      return {
        ...state,
        error: action.payload.data.message
      };
    default:
      return state;
  }
};

