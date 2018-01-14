import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import mockAuthCheck from '../__mocks__/mockAuthCheck';
import mockItems from '../__mocks__/mockItems';
import {
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getTopRecipes,
  getUserRecipes,
  getRecipe,
  getRecipesBySearch,
  getTopRecipesLanding
} from '../../src/actions/recipeActions';

let store = null;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('>>>A C T I O N --- recipeActions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    mockAuthCheck();
    // return mockAuthCheck();
  });
  afterEach(() => moxios.uninstall());

  // Add Recipe Action
  describe('Add recipe action', () => {
    it('should create a RECIPE_ADDED action', (done) => {
      moxios.stubRequest('/api/v1/recipe', {
        status: 201,
        response: {
          message: 'Recipe Added SuccessFullly!',
          recipe: mockItems.recipe
        }
      });

      const expectedActions = [
        {
          payload: {
            message: 'Recipe Added SuccessFullly!',
            recipe: {
              description: 'This recipe is very popular in the south south part of Nigeria', directions: 'pour palm oil in pot, blanch oil for 10mins', id: 1, imageUrl: 'dist/image1', ingredients: 'palm kernel, assorted meat, maggi, palm oil', name: 'Banga Soup', userId: 1
            }
          },
          type: 'ADD_RECIPE'
        }, {
          payload: {
            id: 'RECIPE_ADDED', message: 'Recipe added Successfully', timeout: 5000, title: 'Success', type: 'success'
          },
          type: '@ReduxToastr/toastr/ADD'
        }
      ];
      store.dispatch(addRecipe(mockItems.recipe))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Update Recipe Action
  describe('Update recipe action', () => {
    it('should create a UPDATE_RECIPE action', async (done) => {
      moxios.stubRequest('/api/v1/recipe/1', {
        status: 200,
        response: {
          message: 'Recipe Updated SuccessFullly!',
          recipe: mockItems.recipe
        }
      });

      const expectedActions = [
        {
          payload: {
            message: 'Recipe Updated SuccessFullly!',
            recipe: {
              description: 'This recipe is very popular in the south south part of Nigeria', directions: 'pour palm oil in pot, blanch oil for 10mins', id: 1, imageUrl: 'dist/image1', ingredients: 'palm kernel, assorted meat, maggi, palm oil', name: 'Banga Soup', userId: 1
            }
          },
          type: 'UPDATE_RECIPE'
        }, {
          payload: {
            id: 'RECIPE_UPDATED', message: 'Recipe updated Successfully', timeout: 5000, title: 'Success', type: 'success'
          },
          type: '@ReduxToastr/toastr/ADD'
        }
      ];
      await store.dispatch(updateRecipe(
        1,
        mockItems.updateRecipe.name,
        mockItems.updateRecipe.description,
        mockItems.updateRecipe.ingredients,
        mockItems.updateRecipe.directions,
        mockItems.updateRecipe.imageUrl
      ))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Delete Recipe Action
  describe('Delete recipe action', () => {
    it('should create a DELETE_RECIPE action', async (done) => {
      const id = 1;
      moxios.stubRequest(`/api/v1/recipe/${id}`, {
        status: 200,
        response: {
          message: 'Recipe Deleted SuccessFullly!'
        }
      });

      const expectedActions = [
        { payload: { message: 'Recipe Deleted SuccessFullly!' }, type: 'DELETE_RECIPE' }, {
          payload: {
            id: 'RECIPE_DELETED', message: 'Recipe deleted Successfully', timeout: 5000, title: 'Success', type: 'success'
          },
          type: '@ReduxToastr/toastr/ADD'
        }
      ];
      await store.dispatch(deleteRecipe(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Get all Recipes for landing
  describe('retrieve recipe action', () => {
    it('should create a FETCH_TOP_RECIPES action', async (done) => {
      moxios.stubRequest('/api/v1/topRecipes?sort=upvotes&order=descending', {
        status: 200,
        response: {
          message: 'All Recipes Retrieved SuccessFullly!',
          recipes: [mockItems.recipe]
        }
      });

      const expectedActions = [
        {
          payload: {
            message: 'All Recipes Retrieved SuccessFullly!',
            recipes: [{
              description: 'This recipe is very popular in the south south part of Nigeria', directions: 'pour palm oil in pot, blanch oil for 10mins', id: 1, imageUrl: 'dist/image1', ingredients: 'palm kernel, assorted meat, maggi, palm oil', name: 'Banga Soup', userId: 1
            }]
          },
          type: 'FETCH_TOP_RECIPES'
        }
      ];
      await store.dispatch(getTopRecipesLanding())
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Get top Recipes
  describe('retrieve recipe action', () => {
    it('should create a FETCH_TOP_RECIPES action', async (done) => {
      moxios.stubRequest('/api/v1/recipes?sort=upvotes&order=descending', {
        status: 200,
        response: {
          message: 'All Recipes Retrieved SuccessFullly!',
          recipes: [mockItems.recipe]
        }
      });

      const expectedActions = [
        {
          payload: {
            message: 'All Recipes Retrieved SuccessFullly!',
            recipes: [{
              description: 'This recipe is very popular in the south south part of Nigeria', directions: 'pour palm oil in pot, blanch oil for 10mins', id: 1, imageUrl: 'dist/image1', ingredients: 'palm kernel, assorted meat, maggi, palm oil', name: 'Banga Soup', userId: 1
            }]
          },
          type: 'FETCH_TOP_RECIPES'
        }
      ];
      await store.dispatch(getTopRecipes())
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Get user Recipes
  describe('retrieve user recipes action', () => {
    it('should create a FETCH_USER_RECIPES action', async (done) => {
      moxios.stubRequest('/api/v1/recipes/users', {
        status: 200,
        response: {
          message: 'All User Recipes Retrieved SuccessFullly!',
          recipes: [mockItems.recipe],
          pages: 1
        }
      });

      const expectedActions = [
        {
          payload: {
            message: 'All User Recipes Retrieved SuccessFullly!',
            pages: 1,
            recipes: [{
              description: 'This recipe is very popular in the south south part of Nigeria', directions: 'pour palm oil in pot, blanch oil for 10mins', id: 1, imageUrl: 'dist/image1', ingredients: 'palm kernel, assorted meat, maggi, palm oil', name: 'Banga Soup', userId: 1
            }]
          },
          type: 'FETCH_USER_RECIPES'
        }
      ];
      await store.dispatch(getUserRecipes())
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Get Recipe
  describe('retrieve recipe action', () => {
    it('should create a FETCH_RECIPE action', async (done) => {
      moxios.stubRequest('/api/v1/recipe/1', {
        status: 200,
        response: {
          message: 'Recipe Retrieved SuccessFullly!',
          recipe: mockItems.recipe
        }
      });

      const expectedActions = [
        {
          payload: {
            message: 'Recipe Retrieved SuccessFullly!',
            recipe: {
              description: 'This recipe is very popular in the south south part of Nigeria', directions: 'pour palm oil in pot, blanch oil for 10mins', id: 1, imageUrl: 'dist/image1', ingredients: 'palm kernel, assorted meat, maggi, palm oil', name: 'Banga Soup', userId: 1
            }
          },
          type: 'FETCH_RECIPE'
        }
      ];
      await store.dispatch(getRecipe(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Search Recipes
  describe('search result action', () => {
    it('should create a SEARCH_RECIPES action', async (done) => {
      moxios.stubRequest('/api/v1/recipes?search=banga', {
        status: 200,
        response: {
          message: 'Search result retrieved successfully!',
          recipes: [mockItems.recipe],
          pages: 1
        }
      });

      const expectedActions = [
        {
          payload: {
            message: 'Search result retrieved successfully!',
            pages: 1,
            recipes: [{
              description: 'This recipe is very popular in the south south part of Nigeria', directions: 'pour palm oil in pot, blanch oil for 10mins', id: 1, imageUrl: 'dist/image1', ingredients: 'palm kernel, assorted meat, maggi, palm oil', name: 'Banga Soup', userId: 1
            }]
          },
          type: 'SEARCH_RECIPES'
        }
      ];
      await store.dispatch(getRecipesBySearch('banga'))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });
});
