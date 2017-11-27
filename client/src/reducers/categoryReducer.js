import {
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  FETCH_USER_CATEGORIES,
  FETCH_USER_CATEGORY,
  CATEGORY_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  message: '',
  categoryList: [],
  categoryData: [],
  categoryName: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        message: action.payload.message,
        categoryName: action.payload.categoryData.name,
        categoryList: [...state.categoryList, action.payload.categoryData]
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        message: action.payload.message,
        categoryName: action.payload.categoryData.name,
        categoryList: [...state.categoryList.map(item => (
          item.id === action.payload.categoryData.id ? action.payload.categoryData : item
        ))]
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        message: action.payload.message,
        categoryName: '',
        categoryList: [...state.categoryList.filter(category => category.id !== state.categoryData[0].id)]
      };
    case FETCH_USER_CATEGORIES:
      return {
        ...state,
        categoryList: action.payload.userCategoryList
      };
    case FETCH_USER_CATEGORY:
      return {
        ...state,
        categoryData: action.payload.userCategoryData
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        error: action.payload.data.message
      };
    default:
      return state;
  }
};
