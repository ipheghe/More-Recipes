import axios from 'axios';
import {
  actions as toastrActions
} from 'react-redux-toastr';
import {
  bindActionCreators
} from 'redux';
import {
  API_URL,
  errorHandler
} from './index';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_USER
} from './types';
import decodeToken from '../../../server/helpers/decodeToken';

//= ===============================
// Authentication actions
//= ===============================

/**
 * @description display toastr message for failed signup
 * @type {function} signupFailed
 * @export signupFailed
 * @returns {object} toastr
 */
export const signupFailed = () => (dispatch) => {
  const toastr = bindActionCreators(toastrActions, dispatch);
  toastr.add({
    id: 'INCORRECT_DETAILS',
    type: 'error',
    title: 'Error',
    message: 'One or more of your field(s) is invalid, Please retry with the correct details',
    timeout: 5000,
  });
  setTimeout(() => {
    toastr.remove('INCORRECT_DETAILS');
  }, 3500);
};

/**
 * @description display toastr message for failed login
 * @type {function} loginFailed
 * @export loginFailed
 * @returns {object} toastr
 */
export const loginFailed = () => (dispatch) => {
  const toastr = bindActionCreators(toastrActions, dispatch);
  toastr.add({
    id: 'INCORRECT_CREDENTIALS',
    type: 'error',
    title: 'Error',
    message: 'Your username/password is incorrect, Please retry with the correct details',
    timeout: 5000,
  });
  setTimeout(() => {
    toastr.remove('INCORRECT_CREDENTIALS');
  }, 3500);
};

/**
 * @description signup user action
 * @type {function} registerUser
 * @export registerUser
 * @param {str} username
 * @param {str} password
 * @param {str} firstName
 * @param {str} lastName
 * @param {int} mobileNumber
 * @param {str} email
 * @returns {object} dispatch
 */
export const registerUser = ({
  username,
  password,
  firstName,
  lastName,
  mobileNumber,
  email
}) =>
  (dispatch) => {
    axios.post(`${API_URL}/users/signup`, {
      username,
      password,
      firstName,
      lastName,
      mobileNumber,
      email
    })
      .then((response) => {
        const toastr = bindActionCreators(toastrActions, dispatch);
        if (response.status >= 200 && response.status < 300) {
          dispatch({
            type: AUTH_USER
          });
          window.location.hash = '#login';
          toastr.add({
            id: 'USER_LOGGEDIN',
            type: 'success',
            title: 'Success',
            message: 'Registration Successful. Welcome back!',
            timeout: 5000,
          });
          setTimeout(() => {
            toastr.remove('USER_LOGGEDIN');
          }, 3500);
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

/**
 * @description add recipe action
 * @type {function} loginUser
 * @export loginUser
 * @param {str} username
 * @param {str} password
 * @returns {array} response
 * @callback {object}
 */
export const loginUser = ({
  username,
  password
}) =>
  (dispatch) => {
    axios.post(`${API_URL}/users/signin`, {
      username,
      password
    })
      .then((response) => {
        const toastr = bindActionCreators(toastrActions, dispatch);
        if (response.status >= 200 && response.status < 300) {
          window.localStorage.setItem('token', response.data.authToken);
          dispatch({
            type: AUTH_USER
          });
          window.location.hash = '#dashboard';
          toastr.add({
            id: 'USER_SIGNEDIN',
            type: 'success',
            title: 'Success',
            message: 'Welcome Onboard!',
            timeout: 5000,
          });
          setTimeout(() => {
            toastr.remove('USER_SIGNEDIN');
          }, 3500);
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


/**
 * @description logoutUser user action
 * @type {function} logoutUser
 * @export logoutUser
 * @param {object} error
 * @returns {array} response
 */
export const logoutUser = error =>
  (dispatch) => {
    window.localStorage.clear();
    window.location.hash = '#';
    dispatch({
      type: UNAUTH_USER,
      payload: error || ''
    });
  };


/**
 * @export fetchUsername
 * @returns {array} response
 */
export const fetchUsername = () =>
  (dispatch) => {
    const decodedToken = decodeToken(window.localStorage.getItem('token'));
    const { username } = decodedToken.user;
    axios.get(`${API_URL}/users/${username}`)
      .then((response) => {
        dispatch({
          type: FETCH_USER,
          payload: response.data.userData,
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
