import axios from 'axios';
import cookie from 'react-cookie';
import { logoutUser } from './auth';
import { STATIC_ERROR, FETCH_USER } from './types';
export const API_URL = 'http://localhost:8000/api/v1';
export const CLIENT_ROOT_URL = 'http://localhost:3000';
import { actions as toastrActions } from 'react-redux-toastr';
import { bindActionCreators } from 'redux';

//= ===============================
// Utility actions
//= ===============================

export function errorHandler(dispatch, error, type) {
  console.log('Error type: ', type);

  let errorMessage = error.response ? error.response.data : error;

  dispatch({
    type,
    payload: errorMessage,
  });
}

// Post Request
export function postData(action, errorType, isAuthReq, url, dispatch, data, message, constant, directTo) {
  const requestUrl = API_URL + url;
  let headers = {};

  if (isAuthReq) {
    headers = { headers: { 'x-access-token': localStorage.getItem('token') } };
  }
  console.log(data);
  axios.post(requestUrl, data, headers)
    .then((response) => {
      const toastr = bindActionCreators(toastrActions, dispatch);
      dispatch({
        type: action,
        payload: response.data,
      });
      if (directTo.length > 3) {
        location.hash = directTo;
      }
      toastr.add({
        id: constant,
        type: 'success',
        title: 'Success',
        message: message,
        timeout: 5000,
      });
      setTimeout(() => { toastr.remove(constant); }, 3500);
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType);
    });
}

// Get Request
export function getData(action, errorType, isAuthReq, url, dispatch) {
  const requestUrl = API_URL + url;
  let headers = {};

  if (isAuthReq) {
    headers = { headers: { 'x-access-token': localStorage.getItem('token') } };
  }

  axios.get(requestUrl, headers)
    .then((response) => {
      dispatch({
        type: action,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error, '=============>')
      errorHandler(dispatch, error.response, errorType);
    });
}

// Put Request
export function putData(action, errorType, isAuthReq, url, dispatch, data, message, constant, directTo) {
  const requestUrl = API_URL + url;
  let headers = {};

  if (isAuthReq) {
    headers = { headers: { 'x-access-token': localStorage.getItem('token') } };
  }

  axios.put(requestUrl, data, headers)
    .then((response) => {
      console.log(response, 'votesss')
      dispatch({
        type: action,
        payload: response.data,
      });
      if (directTo.length > 3) {
        location.hash = directTo;
      }
      toastr.add({
        id: constant,
        type: 'success',
        title: 'Success',
        message: message,
        timeout: 5000,
      });
      setTimeout(() => { toastr.remove(constant); }, 3500);
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType);
    });
}

// Delete Request
export function deleteData(action, errorType, isAuthReq, url, dispatch, message, constant, directTo) {
  const requestUrl = API_URL + url;
  let headers = {};

  if (isAuthReq) {
    headers = { headers: { 'x-access-token': localStorage.getItem('token') } };
  }

  axios.delete(requestUrl, headers)
    .then((response) => {
      dispatch({
        type: action,
        payload: response.data,
      });
      if (directTo.length > 3) {
        location.hash = directTo;
      }
      toastr.add({
        id: constant,
        type: 'success',
        title: 'Success',
        message: message,
        timeout: 5000,
      });
      setTimeout(() => { toastr.remove(constant); }, 3500);
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType);
    });
}
