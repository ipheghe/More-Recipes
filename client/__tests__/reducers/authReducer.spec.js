import expect from 'expect';
import reducer from '../../src/reducers/auth_reducer';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_USER
} from '../../src/actions/types';
import mockItems from '../__mocks__/mockItems';

let initialState = {};

describe('User reducer', () => {
  beforeEach(() => {
    initialState = {
      error: '',
      message: '',
      userData: {},
      authenticated: false,
      categories: []
    };
  });
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle AUTH_USER', () => {
    const authAction = {
      type: AUTH_USER
    };
    expect(reducer(initialState, authAction)).toEqual({
      error: '',
      message: '',
      userData: {},
      authenticated: true,
      categories: []
    });
  });

  it('should handle UNAUTH_USER', () => {
    const unAuthAction = {
      type: UNAUTH_USER,
      payload: ''
    };
    expect(reducer(initialState, unAuthAction)).toEqual({
      error: unAuthAction.payload,
      message: '',
      userData: {},
      authenticated: false,
      categories: []
    });
  });

  it('should handle FETCH_USER', () => {
    const fetchUserAction = {
      type: FETCH_USER,
      payload: mockItems.user
    };
    expect(reducer(initialState, fetchUserAction)).toEqual({
      error: '',
      message: '',
      userData: fetchUserAction.payload,
      authenticated: false,
      categories: []
    });
  });

  it('should handle AUTH_ERROR', () => {
    const authErrorAction = {
      type: AUTH_ERROR,
      payload: {
        message: 'Authentication failed!'
      }
    };
    expect(reducer(initialState, authErrorAction)).toEqual({
      error: authErrorAction.payload.message,
      message: '',
      userData: {},
      authenticated: false,
      categories: []
    });
  });
});
