import * as types from '../actions/actionTypes';

export default function signinReducer(state = [], action) {
  switch (action.type) {
    case types.SIGNIN_USER:
      return action.payload
    default:
      return state;
  }
}

