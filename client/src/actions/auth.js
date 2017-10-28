import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import { API_URL, errorHandler } from './index';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST, PROTECTED_TEST, FETCH_USER } from './types';
import { actions as toastrActions } from 'react-redux-toastr';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';

//= ===============================
// Authentication actions
//= ===============================

/**
 * @description add recipe action
 * @type {function} loginUser
 * @export loginUser
 * @param {object} { username, password }
 * @returns {array} response
 * @callback {object}
 */
export function loginUser({ username, password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/users/signin`, { username, password })
      .then((response) => {
        const toastr = bindActionCreators(toastrActions, dispatch);
        if (response.status >= 200 && response.status < 300) {
          localStorage.setItem('token', response.data.authToken);
          dispatch({ type: AUTH_USER });
          location.hash = '#dashboard';
          toastr.add({
            id: 'USER_SIGNEDIN',
            type: 'success',
            title: 'Success',
            message: 'Welcome Onboard!',
            timeout: 5000,
          });
          setTimeout(() => { toastr.remove('USER_SIGNEDIN'); }, 3500);
        } else if (response.status === 404) {
          const error = new Error(response.statusText);
          error.response = response;
          dispatch(loginFailed(error));
        }
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

/**
 * @description display toastr message for failed login
 * @type {function} loginFailed
 * @export loginFailed
 * @returns
 */
export function loginFailed() {
  return dispatch => {
    const toastr = bindActionCreators(toastrActions, dispatch);
    toastr.add({
      id: 'INCORRECT_CREDENTIALS',
      type: 'error',
      title: 'Error',
      message: 'Your username/password is incorrect, Please retry with the correct details',
      timeout: 5000,
    });
    setTimeout(() => { toastr.remove('INCORRECT_CREDENTIALS'); }, 3500);
  };
}

/**
 * @description signup user action
 * @type {function} registerUser
 * @export registerUser
 * @param {object} { username, password, firstName, lastName, mobileNumber, email }
 * @returns {object} dispatch
 */
export function registerUser({ username, password, firstName, lastName, mobileNumber, email }) {
  return function (dispatch) {
    axios.post(`${API_URL}/users/signup`, { username, password, firstName, lastName, mobileNumber, email })
      .then((response) => {
        const toastr = bindActionCreators(toastrActions, dispatch);
        if (response.status >= 200 && response.status < 300) {
          dispatch({ type: AUTH_USER });
          location.hash = '#login';
          toastr.add({
            id: 'USER_LOGGEDIN',
            type: 'success',
            title: 'Success',
            message: 'Registration Successful. Welcome back!',
            timeout: 5000,
          });
          setTimeout(() => { toastr.remove('USER_LOGGEDIN'); }, 3500);
        } else {
          const error = new Error(response.statusText);
          error.response = response;
          dispatch(signupFailed(response));
        }
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

/**
 * @description display toastr message for failed signup
 * @type {function} signupFailed
 * @export
 * @returns
 */
export function signupFailed() {
  return dispatch => {
    const toastr = bindActionCreators(toastrActions, dispatch);
    toastr.add({
      id: 'INCORRECT_DETAILS',
      type: 'error',
      title: 'Error',
      message: 'One or more of your field(s) is invalid, Please retry with the correct details',
      timeout: 5000,
    });
    setTimeout(() => { toastr.remove('INCORRECT_DETAILS'); }, 3500);
  };
}

/**
 * @description logoutUser user action
 * @type {function} logoutUser
 * @export logoutUser
 * @param {object} error
 * @returns
 */
export function logoutUser(error) {
  return function (dispatch) {
    localStorage.clear();
    location.hash = '#';
    dispatch({ type: UNAUTH_USER, payload: error || '' });
    // localStorage.clear();
  };
}

/**
 *
 *
 * @export
 * @param {object} { email }
 * @returns
 */
export function getForgotPasswordToken({ email }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/forgot-password`, { email })
      .then((response) => {
        dispatch({
          type: FORGOT_PASSWORD_REQUEST,
          payload: response.data.message,
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

/**
 *
 *
 * @export
 * @param {any} token
 * @param {any} { password }
 * @returns
 */
export function resetPassword(token, { password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/reset-password/${token}`, { password })
      .then((response) => {
        dispatch({
          type: RESET_PASSWORD_REQUEST,
          payload: response.data.message,
        });
        // Redirect to login page on successful password reset
        browserHistory.push('/login');
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

/**
 *
 * @param {*} response
 */
const getUsers = (response) => {
  return { type: FETCH_USER, response };
};

/**
 *
 *
 * @export
 * @returns
 */
export function fetchUsername() {
  const decoded = jwtDecode(localStorage.getItem('token'));
  const username = decoded.user.username;
  return ((dispatch) => {
    axios.get(`${API_URL}/users/${username}`)
      .then((response) => {
        console.log(response);
        dispatch(getUsers(response.data.userData));
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  });
}
