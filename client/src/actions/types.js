//= =====================
// Auth Actions
//= =====================
export const AUTH_USER = 'AUTH_USER',
  UNAUTH_USER = 'UNAUTH_USER',
  AUTH_ERROR = 'AUTH_ERROR';

//= =====================
// User Profile Actions
//= =====================
export const FETCH_USER = 'FETCH_USER',
  UPDATE_USER = 'UPDATE_USER',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  RESET_PASSWORD = 'RESET_PASSWORD',
  VERIFY_PASSWORD_TOKEN = 'VERIFY_PASSWORD_TOKEN',
  USER_ERROR = 'USER_ERROR';

//= =====================
// Recipe Actions
//= =====================
export const FETCH_TOP_RECIPES = 'FETCH_TOP_RECIPES',
  FETCH_USER_RECIPES = 'FETCH_USER_RECIPES',
  FETCH_RECIPE = 'FETCH_RECIPE',
  SEARCH_RECIPES = 'SEARCH_RECIPES',
  ADD_RECIPE = 'ADD_RECIPE',
  UPDATE_RECIPE = 'UPDATE_RECIPE',
  DELETE_RECIPE = 'DELETE_RECIPE',
  RECIPE_ERROR = 'RECIPE_ERROR';

//= =====================
// Review Actions
//= =====================
export const REVIEW_RECIPE = 'REVIEW_RECIPE',
  RETRIEVE_RECIPE_REVIEWS = 'RETRIEVE_RECIPE_REVIEWS',
  REVIEW_ERROR = 'REVIEW_ERROR';

//= =====================
// Category Actions
//= =====================
export const ADD_CATEGORY = 'ADD_CATEGORY',
  FETCH_USER_CATEGORIES = 'FETCH_USER_CATEGORIES',
  CATEGORY_ERROR = 'CATEGORY_ERROR';

//= =====================
// Favorite Actions
//= =====================
export const FAVORITE_RECIPE = 'FAVORITE_RECIPE',
  RETRIEVE_USER_FAVORITE_RECIPES = 'RETRIEVE_USER_FAVORITE_RECIPES',
  FAVORITE_ERROR = 'FAVORITE_ERROR';

//= =====================
// Vote Actions
//= =====================
export const UPVOTE_RECIPE = 'UPVOTE_RECIPE',
  DOWNVOTE_RECIPE = 'DOWNVOTE_RECIPE',
  VOTE_ERROR = 'VOTE_ERROR';

export const IMAGE_FILE_REQUEST = 'IMAGE_FILE_REQUEST',
  IMAGE_FILE_SUCCESSFUL = 'IMAGE_FILE_SUCCESSFUL',
  IMAGE_FILE_FAILURE = 'IMAGE_FILE_FAILURE';
