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
 *
 * @type {function} addCategory
 *
 * @param {string} name
 *
 * @returns {action} dispatch
 */
const addCategory = (name) => {
  const data = { name };
  const url = '/user/category';
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
 *
 * @type {function} updateCategory
 *
 * @param {number} categoryId
 * @param {string} name
 *
 * @returns {action} dispatch
 */
const updateCategory = (categoryId, name) => {
  const data = { name };
  const url = `/user/category/${categoryId}`;
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
 *
 * @type {function} deleteCategory
 *
 * @param {number} categoryId
 *
 * @returns {action} dispatch
 */
const deleteCategory = (categoryId) => {
  const url = `/user/category/${categoryId}`;
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
  );
};

/**
 * @description action to get user categories
 *
 * @type {function} getUserCategories
 *
 * @returns {action} dispatch
 */
const getUserCategories = () => {
  const url = '/categories/users';
  return dispatch => getData(
    FETCH_USER_CATEGORIES,
    CATEGORY_ERROR,
    true,
    url,
    dispatch
  );
};

/**
 * @description action to get user category
 *
 * @type {function} getUserCategory
 *
 * @param {number} categoryId
 *
 * @returns {action} dispatch
 */
const getUserCategory = (categoryId) => {
  const url = `/category/user/${categoryId}`;
  return dispatch => getData(
    FETCH_USER_CATEGORY,
    CATEGORY_ERROR,
    true,
    url,
    dispatch
  );
};

export {
  addCategory,
  updateCategory,
  deleteCategory,
  getUserCategories,
  getUserCategory
};
