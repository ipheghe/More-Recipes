import { actions as toastrActions } from 'react-redux-toastr';
import { bindActionCreators } from 'redux';
import history from '../../history';
import * as types from './actionTypes';
import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  HashRouter as Router, Route, IndexRoute, hashHistory
} from 'react-router-dom';
import React from "react";
const BASE_URL = 'http://localhost:8000';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST, PROTECTED_TEST } from './types';


export function loginSuccess(token,userData) {
  return dispatch => {
    dispatch({ 
      type: types.LOG_IN_SUCCESS ,   
      isAuthenticated: true,
      token,
      userData,
    });
    location.hash = '#addRecipe';
    const toastr = bindActionCreators(toastrActions, dispatch);
    toastr.add({
      id: 'USER_SIGNEDIN',
      type: 'success',
      title: 'Success',
      message: 'Welcome Onboard!',
      timeout: 5000,
    });
    setTimeout(() => { toastr.remove('USER_SIGNEDIN'); }, 3500);
  };
}

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

export function UserNotFound() {
  return dispatch => {
    const toastr = bindActionCreators(toastrActions, dispatch);
    toastr.add({
      id: 'INCORRECT_CREDENTIALS',
      type: 'error',
      title: 'Error',
      message: 'Username does not exist!',
      timeout: 5000,
    });
    setTimeout(() => { toastr.remove('INCORRECT_CREDENTIALS'); }, 3500);
  };
}

export function loginError(error) {
  return { error, type: types.LOG_IN_ERROR };
}

export function signupSuccess(response) {
  return dispatch => {
    dispatch({ response, type: types.SIGN_UP_SUCCESS });
    history.push('/#login');
    location.hash = '#login';
    const toastr = bindActionCreators(toastrActions, dispatch);
    toastr.add({
      id: 'USER_LOGGEDIN',
      type: 'success',
      title: 'Success',
      message: 'Login Successful. Welcome back!',
      timeout: 5000,
    });
    setTimeout(() => { toastr.remove('USER_LOGGEDIN'); }, 3500);
  };
}

export function signupFailed() {
  return dispatch => {
    const toastr = bindActionCreators(toastrActions, dispatch);
    toastr.add({
      id: 'INCORRECT_DETAILS',
      type: 'error',
      title: 'Error',
      message: 'Your username/password is incorrect, Please retry with the correct details',
      timeout: 5000,
    });
    setTimeout(() => { toastr.remove('INCORRECT_DETAILS'); }, 3500);
  };
}


export function logInUser(username,password) {
  const url = `${BASE_URL}/api/v1/users/signin`;
  return dispatch =>
    fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          console.log('response', response.status);
          response.json().then(json => {
            const userData =  JSON.parse(JSON.stringify(json.userData));
            const token =  JSON.parse(JSON.stringify(json.authToken));
            localStorage.setItem('token', token);
            dispatch(loginSuccess(token,userData));
            });
        } else if (response.status === 400) {
          const error = new Error(response.statusText);
          error.response = response;
          dispatch(loginFailed(error));
        } else if (response.status === 404) {
          const error = new Error(response.statusText);
          error.response = response;
          dispatch(UserNotFound(error));
        } else {
          const error = new Error(response.statusText);
          error.response = response;
          console.log('response', response.status);
          dispatch(loginError(error));
          throw error;
        }
      })
      .catch(error => { throw error; })
}


export function signUpUser(username,firstName,lastName,mobile,email,password) {
  const url = `${BASE_URL}/api/v1/users/signup`;
  return dispatch =>
    fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        firstName: firstName,
        lastName: lastName,
        mobileNumber: mobile,
        email: email,
        password: password,
      }),
    })
      .then(response => {
        console.log(response.status);
        if (response.status >= 200 && response.status < 300) {
          // sessionStorage.setItem('jwt', response.usertoken);
          dispatch(signupSuccess(response));
        } else if (response.status === 400) {
          const error = new Error(response.statusText);
          error.response = response;
          dispatch(signupFailed(response));
        } else {
          const error = new Error(response.statusText);
          error.response = response;
          dispatch(loginError(error));
          throw error;
        }
      })
      .catch(error => { throw error; });
}

function checkStatus(response) {
  return dispatch => {
    if (response.status >= 200 && response.status < 300) {
          sessionStorage.setItem('jwt', response.usertoken);
          dispatch(loginSuccess(response));
        } else if (response.status === 400) {
          const error = new Error(response.statusText);
          error.response = response;
          dispatch(loginFailed(error));
        } else {
          const error = new Error(response.statusText);
          error.response = response;
          dispatch(loginError(error));
          throw error;
        }
      }

}
 
function parseJSON(response) {
  return response.json()
}

export function protectedTest() {
  return dispatch => {
                console.log(sessionStorage.getItem('token'));
    const url = `${BASE_URL}/api/v1/recipes`;
    fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': sessionStorage.getItem('token'),
      },
    })
    .then((response) => {
      dispatch({
        type: PROTECTED_TEST,
        payload: response.data.content,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}

// add user and token to the store
export const setUserData = ({ token, userData }) => (dispatch) => {
  dispatch(loginSuccess({ token, userData }));
};

