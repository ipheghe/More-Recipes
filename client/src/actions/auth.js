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

// TO-DO: Add expiration to cookie
export function loginUser({ username, password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/users/signin`, { username, password })
      .then((response) => {
        localStorage.setItem('token', response.data.authToken);
        localStorage.setItem('user', response.data.userData);
        const decoded = jwtDecode(response.data.authToken);
        dispatch({ type: AUTH_USER });
        location.hash = '#dashboard';
        const toastr = bindActionCreators(toastrActions, dispatch);
        toastr.add({
          id: 'USER_SIGNEDIN',
          type: 'success',
          title: 'Success',
          message: 'Welcome Onboard!',
          timeout: 5000,
        });
        setTimeout(() => { toastr.remove('USER_SIGNEDIN'); }, 3500);
      });
  };
}

export function registerUser({ username, firstName, lastName, mobile, email, password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/users/signup`, { username, firstName, lastName, mobile, email, password })
      .then((response) => {
        console.log("responsez", response.status);
        localStorage.setItem('userData', response.data.userData);
        dispatch({ type: AUTH_USER });
        // window.location.href = `${CLIENT_ROOT_URL}/login`;
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function logoutUser(error) {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER, payload: error || '' });
    cookie.remove('token', { path: '/' });
    cookie.remove('user', { path: '/' });

    // window.location.href = `${CLIENT_ROOT_URL}/login`;
  };
}

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

const getUsers = (response) => {
  return { type: FETCH_USER, response }
}

const getRecipies = (response) => {
  return { type: PROTECTED_TEST, response }
}

export function fetchUsername() {
  const decoded = jwtDecode(localStorage.getItem('token'));
  const username = decoded.user.username;
  return ((dispatch) => {
    axios.get(`${API_URL}/users/${username}`)
      .then((response) => {
        dispatch(getUsers(response.data.userData.username));
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  })
}

export function protectedTest() {
  return ((dispatch) => {
    return axios.get(`${API_URL}/recipes`, {
      headers: { 'x-access-token': localStorage.getItem('token') },
    })
      .then((response) => {
        dispatch(getRecipies(response.data.recipeData));
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  })
}
