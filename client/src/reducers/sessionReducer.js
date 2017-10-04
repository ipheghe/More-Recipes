//import { browserHistory } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom';
import * as types from '../actions/actionTypes';

const initialState = {
  isAuthenticated: !!localStorage.getItem('token')
};
export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOG_IN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        errorMessage: '',
        token: action.token,
        user: action.user
      });
    case types.LOG_IN_FAILED:
      return { error: action.error };
    case types.LOG_IN_ERROR:
      return { error: action.error };
    case types.SIGN_UP_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
      });
    default:
      return state;
  }
}
