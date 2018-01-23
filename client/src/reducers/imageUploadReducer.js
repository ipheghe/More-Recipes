import {
  IMAGE_FILE_FAILURE,
  IMAGE_FILE_REQUEST,
  IMAGE_FILE_SUCCESSFUL
} from '../actions/types';


const initialState = [{
  imageData: {},
  response: '',
  error: '',
  isloaded: false,
}];

/**
 * @description this Reducer implements the action for the image upload reducer
 *
 * @param {Object}  state - initial state
 * @param {Object} action - redux action
 *
 * @returns {Object} - current state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case IMAGE_FILE_REQUEST:
      return [{
        imageData: action.imageData,
        response: '',
        error: '',
        isloaded: false,
      }, ...state];

    case IMAGE_FILE_SUCCESSFUL:
      return [{
        imageData: {},
        response: action.response,
        error: '',
        isloaded: true,
      }, ...state];

    case IMAGE_FILE_FAILURE:
      return [{
        imageData: {},
        response: '',
        error: action.error,
        isloaded: false,
      }, ...state];

    default:
      return state;
  }
};
