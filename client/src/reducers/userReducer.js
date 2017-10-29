import { FETCH_USER, UPDATE_USER, USER_ERROR } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', userData: {} };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, userData: action.payload.userData };
    case USER_ERROR:
      return { ...state, error: action.payload.data.error };
    case FETCH_USER:
      return { ...state, userData: action.response };
    default:
      return state;
  }
};
