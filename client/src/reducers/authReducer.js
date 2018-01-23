import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_USER
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  message: '',
  userData: {},
  authenticated: false,
  categories: []
};


/**
 * @description this Reducer implements the action for the auth reducer
 *
 * @param {Object}  state - initial state
 * @param {Object} action - redux action
 *
 * @returns {Object} - current state
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        error: '',
        message: '',
        authenticated: true
      };
    case UNAUTH_USER:
      return {
        ...state,
        authenticated: false,
        error: action.payload
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload.message
          ? action.payload.message : action.payload.error
      };
    case FETCH_USER:
      return {
        ...state,
        userData: action.payload
      };
    default:
      return state;
  }
};
