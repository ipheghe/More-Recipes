//= =====================
// Auth Actions
//= =====================
export const AUTH_USER = 'auth_user',
  UNAUTH_USER = 'unauth_user',
  AUTH_ERROR = 'auth_error',
  FORGOT_PASSWORD_REQUEST = 'forgot_password_request',
  RESET_PASSWORD_REQUEST = 'reset_password_request',
  PROTECTED_TEST = 'protected_test';

//= =====================
// User Profile Actions
//= =====================
export const FETCH_USER = 'FETCH_USER',
  UPDATE_USER = 'UPDATE_USER',
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

