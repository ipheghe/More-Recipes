import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import mockAuthCheck from '../__mocks__/mockAuthCheck';
import mockItems from '../__mocks__/mockItems';
import {
  favoriteRecipe,
  unfavoriteRecipe,
  getFavoriteRecipe,
  getFavoriteRecipes
} from '../../src/actions/favoriteActions';

let store = null;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('>>>A C T I O N --- favoriteActions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    mockAuthCheck();
  });
  afterEach(() => moxios.uninstall());

  // Favorite Recipe Action
  describe('favorite recipe action', () => {
    it('should create a FAVORITE_RECIPE action', (done) => {
      moxios.stubRequest('/api/v1/recipe/1/1/favorite', {
        status: 201,
        response: {
          message: 'Recipe added to favorites Successfully',
          favorite: mockItems.favorite
        }
      });

      const expectedActions = [
        {
          payload: { favorite: { id: 1, recipeId: 1, userId: 1 }, message: 'Recipe added to favorites Successfully' },
          type: 'FAVORITE_RECIPE'
        }
      ];
      store.dispatch(favoriteRecipe(1, 1))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // UnFavorite Recipe Action
  describe('Unfavorite recipe action', () => {
    it('should create a UNFAVORITE_RECIPE action', async (done) => {
      moxios.stubRequest('/api/v1/favorite/1', {
        status: 200,
        response: {
          message: 'Recipe Unfavorited SuccessFullly!'
        }
      });

      const expectedActions = [
        { payload: { message: 'Recipe Unfavorited SuccessFullly!' }, type: 'UNFAVORITE_RECIPE' }
      ];
      await store.dispatch(unfavoriteRecipe(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Get user Favorites
  describe('retrieve user favorites action', () => {
    it('should create a RETRIEVE_USER_FAVORITE_RECIPES action', async (done) => {
      moxios.stubRequest('/api/v1/favorites', {
        status: 200,
        response: {
          message: 'User Favorite recipes retrieved Successfully',
          userFavorites: [mockItems.favorite]
        }
      });

      const expectedActions = [
        {
          payload: { message: 'User Favorite recipes retrieved Successfully', userFavorites: [{ id: 1, recipeId: 1, userId: 1 }] },
          type: 'RETRIEVE_USER_FAVORITE_RECIPES'
        }
      ];
      await store.dispatch(getFavoriteRecipes())
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Get User Favorite recipe
  describe('retrieve user favorite action', () => {
    it('should create a RETRIEVE_USER_FAVORITE_RECIPE action', async (done) => {
      moxios.stubRequest('/api/v1/favorite/1', {
        status: 200,
        response: {
          message: 'User Favorite recipe retrieved Successfully',
          userFavorite: mockItems.category
        }
      });

      const expectedActions = [
        {
          payload: { message: 'User Favorite recipe retrieved Successfully', userFavorite: { id: 1, name: 'Local Dish', userId: 1 } },
          type: 'RETRIEVE_USER_FAVORITE_RECIPE'
        }
      ];
      await store.dispatch(getFavoriteRecipe(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });
});
