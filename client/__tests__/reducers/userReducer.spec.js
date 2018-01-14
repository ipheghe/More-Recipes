import expect from 'expect';
import reducer from '../../src/reducers/userReducer';
import {
  FETCH_USER,
  UPDATE_USER,
  CHANGE_PASSWORD,
  USER_ERROR
} from '../../src/actions/types';
import mockItems from '../__mocks__/mockItems';

let initialState = {};

describe('User reducer', () => {
  beforeEach(() => {
    initialState = {
      status: '',
      error: '',
      message: '',
      userData: {},
    };
  });
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle UPDATE_USER', () => {
    const updateUserAction = {
      type: UPDATE_USER,
      payload: {
        success: true,
        userData: mockItems.user
      }
    };
    expect(reducer(initialState, updateUserAction)).toEqual({
      ...initialState,
      userData: mockItems.user
    });
  });

  it('should handle CHANGE_PASSWORD', () => {
    const changePasswordAction = {
      type: CHANGE_PASSWORD,
      payload: {
        status: 'Success',
        message: 'User Password Changed SuccessFullly!'
      }
    };
    expect(reducer(initialState, changePasswordAction)).toEqual({
      error: '',
      message: 'User Password Changed SuccessFullly!',
      status: 'Success',
      userData: {}
    });
  });

  it('should handle FETCH_USER', () => {
    const fetchUserAction = {
      type: FETCH_USER,
      payload: {
        initialState,
        userData: mockItems.user
      }
    };
    expect(reducer(initialState, fetchUserAction)).toEqual({
      status: '',
      error: '',
      message: '',
      userData: mockItems.user
    });
  });

  it('should handle USER_ERROR', () => {
    const userErrorAction = {
      type: USER_ERROR,
      payload: {
        status: 'Fail',
        message: 'User doesnt exist'
      }
    };
    expect(reducer(initialState, userErrorAction)).toEqual({
      message: '',
      userData: {},
      status: userErrorAction.payload.status,
      error: userErrorAction.payload.message
    });
  });
});
