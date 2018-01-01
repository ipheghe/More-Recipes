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
  userCategoryList: [],
  categoryName: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        message: action.payload.message,
        categoryName: action.payload.category.name,
        categoryList: [...state.categoryList, action.payload.category]
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        message: action.payload.message,
        categoryName: action.payload.category.name,
        categoryList: [...state.categoryList.map(item => (
          item.id === action.payload.category.id ? action.payload.category : item
        ))]
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        message: action.payload.message,
        categoryName: '',
        categoryList: [
          ...state.categoryList.filter(category => category.id !== state.userCategoryList[0].id)
        ]
      };
    case FETCH_USER_CATEGORIES:
      return {
        ...state,
        categoryList: action.payload.userCategories
      };
    case FETCH_USER_CATEGORY:
      return {
        ...state,
        userCategoryList: action.payload.userCategory
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
