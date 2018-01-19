import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import mockAuthCheck from '../__mocks__/mockAuthCheck';
import mockItems from '../__mocks__/mockItems';
import {
  addCategory,
  updateCategory,
  deleteCategory,
  getUserCategories,
  getUserCategory
} from '../../src/actions/categoryActions';

let store = null;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('>>>A C T I O N --- categoryActions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    mockAuthCheck();
  });
  afterEach(() => moxios.uninstall());

  // Add Recipe Action
  describe('Add category action', () => {
    it('should create a ADD_CATEGORY action', (done) => {
      moxios.stubRequest('/api/v1/user/category', {
        status: 201,
        response: {
          message: 'Category created Successfully',
          category: mockItems.recipe
        }
      });

      const expectedActions = [
        {
          payload: {
            category: {
              description: 'This recipe is very popular in the ' +
              'south south part of Nigeria',
              directions: 'pour palm oil in pot, blanch oil for 10mins',
              id: 1,
              imageUrl: 'dist/image1',
              ingredients: 'palm kernel, assorted meat, maggi, palm oil',
              name: 'Banga Soup',
              userId: 1
            },
            message: 'Category created Successfully'
          },
          type: 'ADD_CATEGORY'
        }
      ];
      store.dispatch(addCategory(mockItems.category.name))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Update Recipe Action
  describe('Update category action', () => {
    it('should create a UPDATE_CATEGORY action', async (done) => {
      moxios.stubRequest('/api/v1/user/category/1', {
        status: 200,
        response: {
          message: 'category name changed SuccessFullly!',
          category: mockItems.category
        }
      });

      const expectedActions = [
        {
          payload: {
            category: {
              id: 1,
              name: 'Local Dish',
              userId: 1
            },
            message: 'category name changed SuccessFullly!'
          },
          type: 'UPDATE_CATEGORY'
        }
      ];
      await store.dispatch(updateCategory(1, mockItems.category.name))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Delete Category Action
  describe('Delete category action', () => {
    it('should create a DELETE_CATEGORY action', async (done) => {
      moxios.stubRequest('/api/v1/user/category/1', {
        status: 200,
        response: {
          message: 'Category deleted SuccessFullly!'
        }
      });

      const expectedActions = [
        {
          payload: { message: 'Category deleted SuccessFullly!' },
          type: 'DELETE_CATEGORY'
        }
      ];
      await store.dispatch(deleteCategory(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Get user Categories
  describe('retrieve user categories action', () => {
    it('should create a FETCH_USER_CATEGORIES action', async (done) => {
      moxios.stubRequest('/api/v1/categories/users', {
        status: 200,
        response: {
          message: 'All User Categories Retrieved SuccessFullly!',
          userCategories: [mockItems.category]
        }
      });

      const expectedActions = [
        {
          payload:
          {
            message: 'All User Categories Retrieved SuccessFullly!',
            userCategories: [{ id: 1, name: 'Local Dish', userId: 1 }]
          },
          type: 'FETCH_USER_CATEGORIES'
        }
      ];
      await store.dispatch(getUserCategories())
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Get Category
  describe('retrieve category action', () => {
    it('should create a FETCH_USER_CATEGORY action', async (done) => {
      moxios.stubRequest('/api/v1/category/user/1', {
        status: 200,
        response: {
          message: 'User Category Retrieved SuccessFullly!',
          userCategory: mockItems.category
        }
      });

      const expectedActions = [
        {
          payload:
          {
            message: 'User Category Retrieved SuccessFullly!',
            userCategory: { id: 1, name: 'Local Dish', userId: 1 }
          },
          type: 'FETCH_USER_CATEGORY'
        }
      ];
      await store.dispatch(getUserCategory(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });
});
