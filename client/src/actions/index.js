import axios from 'axios';
import {
  actions as toastrActions
} from 'react-redux-toastr';
import {
  bindActionCreators
} from 'redux';

export const API_URL = 'http://localhost:8000/api/v1';
export const CLIENT_ROOT_URL = 'http://localhost:3000';

//= ===============================
// Utility actions
//= ===============================

/**
 * @export errorHandler
 * @param {action} dispatch
 * @param {string} error
 * @param {constant} type
 * @returns {*} void
 */
export function errorHandler(dispatch, error, type) {
  const errorMessage = error.response ? error.response.data : error;
  const errorData = {
    data: {
      message: ''
    }
  };

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
}

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
 * @param {constant} constant
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
  constant,
  directTo
) => {
  const requestUrl = API_URL + url;
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
      if (document.getElementById('myModal')) {
        document.getElementById('myModal').className = 'modal fade hide';
        document.getElementsByClassName('modal-backdrop')[0].className =
          'modal-backdrop fade hide';
      }
      dispatch({
        type: action,
        payload: response.data,
      });
      if (directTo.length > 0) {
        window.location.hash = directTo;
      }
      if (constant.length > 2) {
        const toastr = bindActionCreators(toastrActions, dispatch);
        toastr.add({
          id: constant,
          type: 'success',
          title: 'Success',
          message,
          timeout: 5000,
        });
        setTimeout(() => {
          toastr.remove(constant);
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
  const requestUrl = API_URL + url;
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
 * @param {constant} constant
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
  constant,
  directTo
) => {
  const requestUrl = API_URL + url;
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
      if (document.getElementById('myModal')) {
        document.getElementById('myModal').className = 'modal fade hide';
        document.getElementsByClassName('modal-backdrop')[0].className =
          'modal-backdrop fade hide';
      }
      const toastr = bindActionCreators(toastrActions, dispatch);
      dispatch({
        type: action,
        payload: response.data,
      });
      if (directTo.length > 3) {
        window.location.hash = directTo;
      }
      if (constant.length > 2) {
        toastr.add({
          id: constant,
          type: 'success',
          title: 'Success',
          message,
          timeout: 5000,
        });
        setTimeout(() => {
          toastr.remove(constant);
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
 * @param {constant} constant
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
  constant,
  directTo
) => {
  const requestUrl = API_URL + url;
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
      if (constant.length > 2) {
        const toastr = bindActionCreators(toastrActions, dispatch);
        toastr.add({
          id: constant,
          type: 'success',
          title: 'Success',
          message,
          timeout: 5000,
        });
        setTimeout(() => {
          toastr.remove(constant);
        }, 3500);
      }
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, errorType);
    });
};
