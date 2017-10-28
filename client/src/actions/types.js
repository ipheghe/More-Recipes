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
export const FETCH_USER = 'fetch_user';

//= =====================
// Recipe Actions
//= =====================
export const FETCH_TOP_RECIPES = 'fetch_top_recipes',
  FETCH_USER_RECIPES = 'fetch_user_recipes',
  FETCH_RECIPE = 'fetch_recipe',
  SEARCH_RECIPES = 'search_recipes',
  ADD_RECIPE = 'add_recipe',
  UPDATE_RECIPE = 'update_recipe',
  DELETE_RECIPE = 'delete_recipe',
  RECIPE_ERROR = 'recipe_error';

//= =====================
// Review Actions
//= =====================
export const REVIEW_RECIPE = 'review_recipe',
  RETRIEVE_RECIPE_REVIEWS = 'retrieve_recipe_reviews',
  REVIEW_ERROR = 'review_error';

//= =====================
// Category Actions
//= =====================
export const ADD_CATEGORY = 'add_category',
  FETCH_USER_CATEGORIES = 'fetch_user_categories',
  CATEGORY_ERROR = 'category_error';

//= =====================
// Favorite Actions
//= =====================
export const FAVORITE_RECIPE = 'favorite_recipe',
  RETRIEVE_USER_FAVORITE_RECIPES = 'retrieve_user_favorite_recipes',
  FAVORITE_ERROR = 'favorite_error';

//= =====================
// Vote Actions
//= =====================
export const UPVOTE_RECIPE = 'upvote_recipe',
  DOWNVOTE_RECIPE = 'downvote_recipe',
  VOTE_ERROR = 'vote_error';

export const GET_CURRENT_RECIPE_ID = 'GET_CURRENT_RECIPE_ID';

export const IMAGE_FILE_REQUEST = 'IMAGE_FILE_REQUEST'
export const IMAGE_FILE_SUCCESSFUL='IMAGE_FILE_SUCCESSFUL';
export const IMAGE_FILE_FAILURE = 'IMAGE_FILE_FAILURE';

