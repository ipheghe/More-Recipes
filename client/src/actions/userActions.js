import { getData, postData, putData, deleteData } from './index';
import { UPDATE_USER, USER_ERROR } from './types';

/**
 * @description update recipe action
 * @type {function} updateRecipe
 * @param {object} recipeId
 * @param {object} recipeDescription
 * @param {object} ingredients
 * @param {object} directions
 * @returns {array} dispatch
 */
const updateUserRecord = (userId, username, firstName, lastName, mobileNumber, email) => {
  const data = { username, firstName, lastName, mobileNumber, email };
  const url = `/users/${userId}`;
  const directTo = '#dashboard';
  const message = 'User Profile updated Successfully';
  const constant = 'UPDATE_USER';
  return dispatch => putData(
    UPDATE_USER,
    USER_ERROR,
    true,
    url,
    dispatch,
    data,
    message,
    constant,
    directTo
  );
};

export { updateUserRecord };
