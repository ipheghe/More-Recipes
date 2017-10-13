import { getData, postData, putData, deleteData } from './index';
import { ADD_CATEGORY, FETCH_USER_CATEGORIES, CATEGORY_ERROR } from './types';
import { actions as toastrActions } from 'react-redux-toastr';
import { bindActionCreators } from 'redux';

//= ===============================
// Category actions
//= ===============================

const addCategory = ( name ) => {
  const data = { name };
  const url = '/users/categories';
  const directTo = '';
  const toastMessage = 'Category added Successfully';
  const constant = 'CATEGORY_ADDED';
  return dispatch => postData(ADD_CATEGORY, CATEGORY_ERROR, true, url, dispatch, data, toastMessage, constant, directTo);
}

const getUserCategories = () => {
  const url = '/categories/users';
  return dispatch => getData(FETCH_USER_CATEGORIES, CATEGORY_ERROR, true, url, dispatch);
}

export { addCategory, getUserCategories }