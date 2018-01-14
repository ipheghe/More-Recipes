import expect from 'expect';
import reducer from '../../src/reducers/recipeReducer';
import {
  ADD_RECIPE,
  FETCH_TOP_RECIPES,
  FETCH_USER_RECIPES,
  SEARCH_RECIPES,
  FETCH_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  RECIPE_ERROR
} from '../../src/actions/types';
import mockItems from '../__mocks__/mockItems';

let initialState = {};

describe('Recipe reducer', () => {
  beforeEach(() => {
    initialState = {
      message: '',
      error: '',
      pages: 1,
      recipeData: {},
      recipeList: [],
      userRecipes: [],
      searchResult: []
    };
  });
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_RECIPE', () => {
    const addRecipeAction = {
      type: ADD_RECIPE,
      payload: {
        message: 'Recipe Added SuccessFullly!'
      }
    };
    expect(reducer(initialState, addRecipeAction)).toEqual({
      message: addRecipeAction.payload.message,
      error: '',
      pages: 1,
      recipeData: {},
      recipeList: [],
      userRecipes: [],
      searchResult: []
    });
  });

  it('should handle UPDATE_RECIPE', () => {
    initialState.userRecipes = [mockItems.recipe];
    const updateRecipeAction = {
      type: UPDATE_RECIPE,
      payload: {
        recipe: mockItems.recipe,
        message: 'Recipe Updated SuccessFullly!'
      }
    };
    expect(reducer(initialState, updateRecipeAction)).toEqual({
      message: updateRecipeAction.payload.message,
      error: '',
      pages: 1,
      recipeData: {},
      recipeList: [],
      userRecipes: [...initialState.userRecipes.map(item => (
        item.id === updateRecipeAction.payload.recipe.id ? updateRecipeAction.payload.recipe : item
      ))],
      searchResult: []
    });
  });

  it('should handle DELETE_RECIPE', () => {
    initialState.userRecipes = [mockItems.recipe];
    initialState.recipeData = mockItems.recipe;
    const deleteRecipeAction = {
      type: DELETE_RECIPE,
      payload: {
        recipe: mockItems.recipe,
        message: 'Recipe Deleted SuccessFullly!'
      }
    };
    expect(reducer(initialState, deleteRecipeAction)).toEqual({
      message: deleteRecipeAction.payload.message,
      error: '',
      pages: 1,
      recipeData: mockItems.recipe,
      recipeList: [],
      userRecipes: [
        ...initialState.userRecipes.filter(recipe => recipe.id !== initialState.recipeData.id)
      ],
      searchResult: []
    });
  });

  it('should handle FETCH_TOP_RECIPES', () => {
    const fetchRecipesAction = {
      type: FETCH_TOP_RECIPES,
      payload: {
        recipes: {
          rows: mockItems.recipeArray
        },
        message: 'All Top Recipes Retrieved SuccessFullly!',
        pages: 1
      }
    };
    expect(reducer(initialState, fetchRecipesAction)).toEqual({
      message: fetchRecipesAction.payload.message,
      error: '',
      pages: fetchRecipesAction.payload.pages,
      recipeData: {},
      recipeList: fetchRecipesAction.payload.recipes.rows,
      userRecipes: [],
      searchResult: []
    });
  });

  it('should handle FETCH_USER_RECIPES', () => {
    const fetchUserRecipesAction = {
      type: FETCH_USER_RECIPES,
      payload: {
        recipes: {
          rows: mockItems.recipeArray
        },
        message: 'All User Recipes Retrieved SuccessFullly!',
        pages: 1
      }
    };
    expect(reducer(initialState, fetchUserRecipesAction)).toEqual({
      message: fetchUserRecipesAction.payload.message,
      error: '',
      pages: fetchUserRecipesAction.payload.pages,
      recipeData: {},
      recipeList: [],
      userRecipes: fetchUserRecipesAction.payload.recipes.rows,
      searchResult: []
    });
  });

  it('should handle SEARCH_RECIPES', () => {
    const searchRecipesAction = {
      type: SEARCH_RECIPES,
      payload: {
        recipes: {
          rows: mockItems.recipeArray
        },
        message: 'Recipe Deleted SuccessFullly!',
        pages: 1
      }
    };
    expect(reducer(initialState, searchRecipesAction)).toEqual({
      message: searchRecipesAction.payload.message,
      error: '',
      pages: searchRecipesAction.payload.pages,
      recipeData: {},
      recipeList: [],
      userRecipes: [],
      searchResult: searchRecipesAction.payload.recipes.rows
    });
  });

  it('should handle FETCH_RECIPE', () => {
    const fetchRecipeAction = {
      type: FETCH_RECIPE,
      payload: {
        recipe: mockItems.recipe,
        message: 'Search result retrieved successfully!',
      }
    };
    expect(reducer(initialState, fetchRecipeAction)).toEqual({
      message: fetchRecipeAction.payload.message,
      error: '',
      pages: 1,
      recipeData: fetchRecipeAction.payload.recipe,
      recipeList: [],
      userRecipes: [],
      searchResult: []
    });
  });

  it('should handle RECIPE_ERROR', () => {
    const recipeErrorAction = {
      type: RECIPE_ERROR,
      payload: {
        message: 'No recipe found for user'
      }
    };
    expect(reducer(initialState, recipeErrorAction)).toEqual({
      message: '',
      error: recipeErrorAction.payload.message,
      pages: 1,
      recipeData: {},
      recipeList: [],
      userRecipes: [],
      searchResult: []
    });
  });
});
