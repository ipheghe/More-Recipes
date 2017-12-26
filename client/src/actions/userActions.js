import {
  postData,
  putData,
} from './index';
import {
  UPDATE_USER,
  CHANGE_PASSWORD,
  RESET_PASSWORD,
  VERIFY_PASSWORD_TOKEN,
  USER_ERROR
} from './types';

/**
 * @description update recipe action
 * @type {function} updateRecipe
 * @param {int} userId
 * @param {str} username
 * @param {str} fullName
 * @param {int} mobileNumber
 * @param {str} email
 * @returns {object} dispatch
 */
const updateUserRecord = (userId, username, fullName, mobileNumber, email) => {
  const data = {
    username,
    fullName,
    mobileNumber,
    email
  };
  const url = `/user/${userId}`;
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

/**
 * @description action to change password
 * @type {function} changePassword
 * @param {int} userId
 * @param {str} password
 * @param {str} newPassword
 * @returns {object} dispatch
 */
const changePassword = (userId, password, newPassword) => {
  const data = {
    password,
    newPassword
  };
  const url = `/user/changePassword/${userId}`;
  const directTo = '#login';
  const message = 'User Password changed Successfully';
  const constant = 'CHANGE_PASSWORD';
  return dispatch => putData(
    CHANGE_PASSWORD,
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

/**
 * @description action to reset password
 * @type {function} resetPassword
 * @param {str} email
 * @returns {object} dispatch
 */
const resetPassword = (email) => {
  const data = {
    email
  };
  const url = '/user/forgotPassword';
  const directTo = '#';
  const message =
    'Password Reset Successfully! Please check your email to and follow link to create a new password';
  const constant = 'RESET_PASSWORD';
  return dispatch => postData(
    RESET_PASSWORD,
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

/**
 * @description action to verify password token for user to put new password
 * @type {function} verifyTokenPassword
 * @param {str} password
 * @param {str} token
 * @returns {object} dispatch
 */
const verifyTokenPassword = (password, token) => {
  const data = {
    password
  };
  const url = `/user/reset-password/${token}`;
  const directTo = '#';
  const message = 'new user password created Successfully';
  const constant = 'VERIFY_PASSWORD_TOKEN';
  return dispatch => postData(
    VERIFY_PASSWORD_TOKEN,
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

export {
  updateUserRecord,
  changePassword,
  resetPassword,
  verifyTokenPassword
};
