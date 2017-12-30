import axios from 'axios';
import {
  actions as toastrActions
} from 'react-redux-toastr';
import {
  bindActionCreators
} from 'redux';

export const BASE_URL = '/api/v1';

/**
 * @export errorHandler
 * @param {action} dispatch
 * @param {string} error
 * @param {constant} type
 * @returns {*} void
 */
export const errorHandler = (dispatch, error, type) => {
  const errorMessage = error.response ? error.response.data : error;
  const errorData = errorMessage;
  errorData.data.message = '';

  dispatch({
    type,
    payload: errorMessage,
  });
  setTimeout(() => {
    dispatch({
      type,
      payload: errorData
    });
  }, 5000);
};

// Post Request
/**
 * @export postData
 * @param {constant} action
 * @param {constant} errorType
 * @param {any} isAuthReq
 * @param {string} url
 * @param {action} dispatch
 * @param {object} data
 * @param {string} message
 * @param {constant} toastrConstant
 * @param {string} directTo
 * @returns {*} void
 */
export const postData = (
  action,
  errorType,
  isAuthReq,
  url,
  dispatch,
  data,
  message,
  toastrConstant,
  directTo
) => {
  const requestUrl = BASE_URL + url;
  let headers = {};

  if (isAuthReq) {
    headers = {
      headers: {
        'x-access-token': window.localStorage.getItem('token')
      }
    };
  }
  axios.post(requestUrl, data, headers)
    .then((response) => {
      dispatch({
        type: action,
        payload: response.data,
      });
      if (directTo.length > 0) {
        window.location.hash = directTo;
      }
      if (toastrConstant.length > 2) {
        const toastr = bindActionCreators(toastrActions, dispatch);
        toastr.add({
          id: toastrConstant,
          type: 'success',
          title: 'Success',
          message,
          timeout: 5000,
        });
        setTimeout(() => {
          toastr.remove(toastrConstant);
        }, 3500);
      }
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType);
    });
};

// Get Request
/**
 * @export getData
 * @param {any} action
 * @param {any} errorType
 * @param {any} isAuthReq
 * @param {any} url
 * @param {any} dispatch
 *  @returns {*} void
 */
export const getData = (action, errorType, isAuthReq, url, dispatch) => {
  const requestUrl = BASE_URL + url;
  let headers = {};

  if (isAuthReq) {
    headers = {
      headers: {
        'x-access-token': window.localStorage.getItem('token')
      }
    };
  }

  axios.get(requestUrl, headers)
    .then((response) => {
      dispatch({
        type: action,
        payload: response.data,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType);
    });
};

// Put Request
/**
 * @export putData
 * @param {constant} action
 * @param {constant} errorType
 * @param {any} isAuthReq
 * @param {string} url
 * @param {action} dispatch
 * @param {object} data
 * @param {string} message
 * @param {constant} toastrConstant
 * @param {string} directTo
 * @returns {*} void
 */
export const putData = (
  action,
  errorType,
  isAuthReq,
  url,
  dispatch,
  data,
  message,
  toastrConstant,
  directTo
) => {
  const requestUrl = BASE_URL + url;
  let headers = {};

  if (isAuthReq) {
    headers = {
      headers: {
        'x-access-token': window.localStorage.getItem('token')
      }
    };
  }

  axios.put(requestUrl, data, headers)
    .then((response) => {
      const toastr = bindActionCreators(toastrActions, dispatch);
      dispatch({
        type: action,
        payload: response.data,
      });
      if (directTo.length > 3) {
        window.location.hash = directTo;
      }
      if (toastrConstant.length > 2) {
        toastr.add({
          id: toastrConstant,
          type: 'success',
          title: 'Success',
          message,
          timeout: 5000,
        });
        setTimeout(() => {
          toastr.remove(toastrConstant);
        }, 3500);
      }
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType);
    });
};

// Delete Request
/**
 * @export deleteData
 * @param {constant} action
 * @param {constant} errorType
 * @param {any} isAuthReq
 * @param {string} url
 * @param {action} dispatch
 * @param {string} message
 * @param {constant} toastrConstant
 * @param {string} directTo
 * @returns {*} void
 */
export const deleteData = (
  action,
  errorType,
  isAuthReq,
  url,
  dispatch,
  message,
  toastrConstant,
  directTo
) => {
  const requestUrl = BASE_URL + url;
  let headers = {};

  if (isAuthReq) {
    headers = {
      headers: {
        'x-access-token': window.localStorage.getItem('token')
      }
    };
  }

  axios.delete(requestUrl, headers)
    .then((response) => {
      dispatch({
        type: action,
        payload: response.data,
      });
      if (directTo.length > 3) {
        window.location.hash = directTo;
      }
      if (toastrConstant.length > 2) {
        const toastr = bindActionCreators(toastrActions, dispatch);
        toastr.add({
          id: toastrConstant,
          type: 'success',
          title: 'Success',
          message,
          timeout: 5000,
        });
        setTimeout(() => {
          toastr.remove(toastrConstant);
        }, 3500);
      }
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType);
    });
};
