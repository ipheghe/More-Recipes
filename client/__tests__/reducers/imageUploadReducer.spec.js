import expect from 'expect';
import reducer from '../../src/reducers/imageUploadReducer';
import {
  IMAGE_FILE_FAILURE, IMAGE_FILE_REQUEST, IMAGE_FILE_SUCCESSFUL
} from '../../src/actions/types';

let initialState = {};

describe('Image Upload reducer', () => {
  beforeEach(() => {
    initialState = [{
      imageData: {},
      response: '',
      error: '',
      isloaded: false
    }];
  });
  it('should return the initial state', () => {
    expect(reducer(undefined, [])).toEqual(initialState);
  });

  it('should handle IMAGE_FILE_REQUEST', () => {
    const imageRequestAction = [{
      type: IMAGE_FILE_REQUEST,
      imageData: {
        file: '/dist/pizza.jpg',
        size: '30mb'
      }
    }];
    expect(reducer(initialState[0], imageRequestAction[0])).toEqual([{
      imageData: imageRequestAction[0].imageData,
      response: '',
      error: '',
      isloaded: false
    }]);
  });

  it('should handle IMAGE_FILE_SUCCESSFUL', () => {
    const imageSuccessfulAction = [{
      type: IMAGE_FILE_SUCCESSFUL,
      response: '/dist/pizza.jpg'
    }];
    expect(reducer(initialState[0], imageSuccessfulAction[0])).toEqual([{
      imageData: {},
      response: imageSuccessfulAction[0].response,
      error: '',
      isloaded: true
    }]);
  });

  it('should handle IMAGE_FILE_FAILURE', () => {
    const imageErrorAction = [{
      type: IMAGE_FILE_FAILURE,
      error: 'Error Uploading Image'
    }];
    expect(reducer(initialState[0], imageErrorAction[0])).toEqual([{
      imageData: {},
      response: '',
      error: imageErrorAction[0].error,
      isloaded: false
    }]);
  });
});
