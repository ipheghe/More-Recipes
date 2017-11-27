import { getData, postData, putData, deleteData } from './index';
import {
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  FETCH_USER_CATEGORIES,
  FETCH_USER_CATEGORY,
  CATEGORY_ERROR
} from './types';

/**
 * @description add category action
 * @type {function} addCategory
 * @param {object} name
 * @returns {object} dispatch
 */
const addCategory = (name) => {
  const data = { name };
  const url = '/users/categories';
  const directTo = '';
  const toastMessage = '';
  const toastrConstant = '';
  return dispatch => postData(
    ADD_CATEGORY,
    CATEGORY_ERROR,
    true,
    url,
    dispatch,
    data,
    toastMessage,
    toastrConstant,
    directTo
  );
};

/**
 * modify category name
 * @description update catergory action
 * @type {function} updateCategory
 * @param {object} categoryId
 * @param {object} name
 * @returns {array} dispatch
 */
const updateCategory = (categoryId, name) => {
  const data = { name };
  const url = `/users/categories/${categoryId}`;
  const directTo = '';
  const message = '';
  const constant = '';
  return dispatch => putData(
    UPDATE_CATEGORY,
    CATEGORY_ERROR,
    true,
    url,
    dispatch,
    data,
    message,
    constant,
    directTo
  );
};

/**
 * @description delete category action
 * @type {function} deleteCategory
 * @param {object} categoryId
 * @returns {array} dispatch
 */
const deleteCategory = (categoryId) => {
  const url = `/users/categories/${categoryId}`;
  const directTo = '';
  const toastMessage = '';
  const constant = '';
  return dispatch => deleteData(
    DELETE_CATEGORY,
    CATEGORY_ERROR,
    true,
    url,
    dispatch,
    toastMessage,
    constant,
    directTo
  );
};

/**
 * @description action to get user categories
 * @type {function} getUserCategories
 * @returns {array} dispatch
 */
const getUserCategories = () => {
  const url = '/categories/users';
  return dispatch => getData(FETCH_USER_CATEGORIES, CATEGORY_ERROR, true, url, dispatch);
};

/**
 * @description action to get user category
 * @type {function} getUserCategory
 * @param {object} categoryId
 * @returns {object} dispatch
 */
const getUserCategory = (categoryId) => {
  const url = `/category/users/${categoryId}`;
  return dispatch => getData(FETCH_USER_CATEGORY, CATEGORY_ERROR, true, url, dispatch);
};

export {
  addCategory,
  updateCategory,
  deleteCategory,
  getUserCategories,
  getUserCategory
};
