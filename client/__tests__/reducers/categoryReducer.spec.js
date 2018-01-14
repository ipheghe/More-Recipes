import expect from 'expect';
import reducer from '../../src/reducers/categoryReducer';
import {
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  FETCH_USER_CATEGORIES,
  FETCH_USER_CATEGORY,
  CATEGORY_ERROR
} from '../../src/actions/types';
import mockItems from '../__mocks__/mockItems';

let initialState = {};

describe('Category reducer', () => {
  beforeEach(() => {
    initialState = {
      error: '',
      message: '',
      categoryList: [],
      userCategoryList: []
    };
  });
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_CATEGORY', () => {
    const addCategoryAction = {
      type: ADD_CATEGORY,
      payload: {
        message: 'Category created Successfully',
        category: mockItems.category
      }
    };
    expect(reducer(initialState, addCategoryAction)).toEqual({
      error: '',
      message: addCategoryAction.payload.message,
      categoryList: [...initialState, addCategoryAction.payload.category],
      userCategoryList: [],
    });
  });

  it('should handle UPDATE_CATEGORY', () => {
    initialState.categoryList = [mockItems.category];
    const updateCatgeoryAction = {
      type: UPDATE_CATEGORY,
      payload: {
        message: 'category name changed SuccessFullly!',
        category: mockItems.category
      }
    };
    expect(reducer(initialState, updateCatgeoryAction)).toEqual({
      error: '',
      message: updateCatgeoryAction.payload.message,
      categoryList: [...initialState.categoryList.map(item => (
        item.id === updateCatgeoryAction.payload.category.id ? updateCatgeoryAction.payload.category : item
      ))],
      userCategoryList: []
    });
  });

  it('should handle DELETE_CATEGORY', () => {
    initialState.categoryList = [mockItems.category];
    initialState.userCategoryList = [mockItems.category];
    const deleteCategoryAction = {
      type: DELETE_CATEGORY,
      payload: {
        message: 'Category deleted SuccessFullly!'
      }
    };
    expect(reducer(initialState, deleteCategoryAction)).toEqual({
      error: '',
      message: deleteCategoryAction.payload.message,
      categoryList: [
        ...initialState.categoryList.filter(category => category.id !== initialState.userCategoryList[0].id)
      ],
      userCategoryList: [mockItems.category],
    });
  });

  it('should handle FETCH_USER_CATEGORIES', () => {
    const fetchUserCategoriesAction = {
      type: FETCH_USER_CATEGORIES,
      payload: {
        recipes: {
          rows: mockItems.recipeArray
        },
        message: 'All User Categories Retrieved SuccessFullly!',
        pages: 1
      }
    };
    expect(reducer(initialState, fetchUserCategoriesAction)).toEqual({
      error: '',
      message: '',
      categoryList: fetchUserCategoriesAction.payload.userCategories,
      userCategoryList: [],
    });
  });

  it('should handle FETCH_USER_CATEGORY', () => {
    const fetchCategoryAction = {
      type: FETCH_USER_CATEGORY,
      payload: {
        recipe: mockItems.recipe,
        message: 'User Category Retrieved SuccessFullly!',
      }
    };
    expect(reducer(initialState, fetchCategoryAction)).toEqual({
      error: '',
      message: '',
      categoryList: [],
      userCategoryList: fetchCategoryAction.payload.userCategoryList,
    });
  });

  it('should handle CATEGORY_ERROR', () => {
    const categoryErrorAction = {
      type: CATEGORY_ERROR,
      payload: {
        message: 'No category found for user'
      }
    };
    expect(reducer(initialState, categoryErrorAction)).toEqual({
      error: categoryErrorAction.payload.message,
      message: '',
      categoryList: [],
      userCategoryList: [],
    });
  });
});
