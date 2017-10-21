import { ADD_RECIPE, FETCH_TOP_RECIPES, FETCH_USER_RECIPES, FETCH_RECIPE, UPDATE_RECIPE, DELETE_RECIPE, RECIPE_ERROR, IMAGE_FILE } from '../actions/types';

const INITIAL_STATE = { message: '', error: '', recipeData: [], recipeList: {}, userRecipe: [], imageUrl: '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_RECIPE:
      return { ...state, message: action.payload.message };
    case FETCH_TOP_RECIPES:
      return { ...state, recipeData: action.payload.recipeData };
    case FETCH_USER_RECIPES:
      return { ...state, userRecipe: action.payload.userRecipeList };
    case FETCH_RECIPE:
      return { ...state, recipeList: action.payload.recipeList };
    case UPDATE_RECIPE:
      return { ...state, message: action.payload.message };
    case DELETE_RECIPE:
      return { ...state, message: action.payload.message };
    case RECIPE_ERROR:
      return { ...state, error: action.payload.data.error };
    default:
      return state;
  }
}
