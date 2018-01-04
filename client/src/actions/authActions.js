import axios from 'axios';
import {
  actions as toastrActions
} from 'react-redux-toastr';
import {
  bindActionCreators
} from 'redux';
import {
  BASE_URL,
  errorHandler
} from './index';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_USER
} from './types';
import decodeToken from '../../../server/helpers/decodeToken';

/**
 * @description signup user action
 * @type {function} registerUser
 * @export registerUser
 *
 * @param {str} username
 * @param {str} password
 * @param {str} fullName
 * @param {int} mobileNumber
 * @param {str} email
 *
 * @returns {action} dispatch
 */
export const registerUser = ({
  username,
  password,
  fullName,
  mobileNumber,
  email
}) =>
  dispatch => axios.post(`${BASE_URL}/user/signup`, {
    username,
    password,
    fullName,
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
          id: 'USER_REGISTERED',
          type: 'success',
          title: 'Success',
          message: 'Registration Successful.',
          timeout: 5000,
        });
        setTimeout(() => {
          toastr.remove('USER_REGISTERED');
        }, 3500);
      }
    })
    .catch((error) => {
      console.log(error.response, '----------------__>');
      errorHandler(dispatch, error, AUTH_ERROR);
    });

/**
 * @description add recipe action
 * @type {function} loginUser
 * @export loginUser
 *
 * @param {str} username
 * @param {str} password
 *
 * @returns {action} response
 * @callback {object}
 */
export const loginUser = ({
  username,
  password
}) =>
  dispatch => axios.post(`${BASE_URL}/user/signin`, {
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
      }
    })
    .catch((error) => {
      errorHandler(dispatch, error, AUTH_ERROR);
    });


/**
 * @description logoutUser user action
 * @type {function} logoutUser
 *
 * @export logoutUser
 * @param {object} error
 *
 * @returns {action} dispatch
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
    return axios.get(`${BASE_URL}/user/${username}`)
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
