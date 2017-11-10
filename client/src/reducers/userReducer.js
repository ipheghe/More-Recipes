import {
  FETCH_USER,
  UPDATE_USER,
  CHANGE_PASSWORD,
  USER_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  error: '',
  message: '',
  userData: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        userData: action.payload.userData
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        message: action.payload.message
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload.data.message
      };
    case FETCH_USER:
      return {
        ...state,
        userData: action.response
      };
    default:
      return state;
  }
};
