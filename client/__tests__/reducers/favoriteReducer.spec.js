import expect from 'expect';
import reducer from '../../src/reducers/favoriteReducer';
import {
  FAVORITE_RECIPE,
  UNFAVORITE_RECIPE,
  RETRIEVE_USER_FAVORITE_RECIPE,
  RETRIEVE_USER_FAVORITE_RECIPES,
  FAVORITE_ERROR
} from '../../src/actions/types';
import mockItems from '../__mocks__/mockItems';

let initialState = {};

describe('Favorite reducer', () => {
  beforeEach(() => {
    initialState = {
      message: '',
      error: '',
      status: false,
      pages: 1,
      userFavorites: [],
      userFavorite: [],
    };
  });
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FAVORITE_RECIPE', () => {
    const favoriteRecipeAction = {
      type: FAVORITE_RECIPE,
      payload: {
        message: 'Recipe added to favorites Successfully',
        favorite: mockItems.favorite,
        status: true
      }
    };
    expect(reducer(initialState, favoriteRecipeAction)).toEqual({
      message: favoriteRecipeAction.payload.message,
      error: '',
      status: true,
      pages: 1,
      userFavorites: [],
      userFavorite: []
    });
  });

  it('should handle UNFAVORITE_RECIPE', () => {
    const unfavoriteRecipeAction = {
      type: UNFAVORITE_RECIPE,
      payload: {
        status: false
      }
    };
    expect(reducer(initialState, unfavoriteRecipeAction)).toEqual({
      message: '',
      error: '',
      status: false,
      pages: 1,
      userFavorites: [],
      userFavorite: []
    });
  });

  it('should handle RETRIEVE_USER_FAVORITE_RECIPES', () => {
    const fetchFavoriteRecipesAction = {
      type: RETRIEVE_USER_FAVORITE_RECIPES,
      payload: {
        userFavorites: {
          rows: mockItems.recipeArray
        },
        message: 'User Favorite recipes retrieved Successfully',
        pages: 1
      }
    };
    expect(reducer(initialState, fetchFavoriteRecipesAction)).toEqual({
      message: fetchFavoriteRecipesAction.payload.message,
      error: '',
      status: false,
      pages: fetchFavoriteRecipesAction.payload.pages,
      userFavorites: fetchFavoriteRecipesAction.payload.userFavorites.rows,
      userFavorite: []
    });
  });

  it('should handle RETRIEVE_USER_FAVORITE_RECIPE', () => {
    const fetchFavoriteRecipeAction = {
      type: RETRIEVE_USER_FAVORITE_RECIPE,
      payload: {
        message: 'User Favorite recipe retrieved Successfully',
        userFavorite: mockItems.favorite,
        status: true
      }
    };
    expect(reducer(initialState, fetchFavoriteRecipeAction)).toEqual({
      message: fetchFavoriteRecipeAction.payload.message,
      error: '',
      pages: 1,
      status: true,
      userFavorites: [],
      userFavorite: fetchFavoriteRecipeAction.payload.userFavorite
    });
  });

  it('should handle FAVORITE_ERROR', () => {
    const favoriteErrorAction = {
      type: FAVORITE_ERROR,
      payload: {
        message: 'No recipe found for user',
        status: true
      }
    };
    expect(reducer(initialState, favoriteErrorAction)).toEqual({
      message: '',
      error: favoriteErrorAction.payload.message,
      pages: 1,
      status: favoriteErrorAction.payload.status,
      userFavorites: [],
      userFavorite: []
    });
  });
});
