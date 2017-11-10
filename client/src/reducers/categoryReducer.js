import {
  ADD_CATEGORY,
  FETCH_USER_CATEGORIES,
  CATEGORY_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  message: '',
  categoryList: [],
  categoryName: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        message: action.payload.message,
        categoryName: action.payload.categoryData.name
      };
    case FETCH_USER_CATEGORIES:
      return {
        ...state,
        categoryList: action.payload.userCategoryList
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
