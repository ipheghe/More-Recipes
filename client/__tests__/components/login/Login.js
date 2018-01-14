import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import {
  Switch,
  HashRouter as Router, hashHistory
} from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Login } from '../../../src/components';
import mockItems from '../../__mocks__/mockItems';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  auth: {
    error: 'Invalid username',
    message: '',
    userData: {},
    authenticated: false,
    categories: []
  },
  user: {
    status: '',
    error: '',
    message: '',
    userData: mockItems.user,
  }
};
const store = mockStore(initialState);

let event;

/**
 *
 * @return { * } null
 */
const setup = () => {
  const props = {
    errorMessage: '',
    modalErrorMessage: '',
    loginUser: jest.fn()
  };
  const mountedWrapper = mount(<Router history={hashHistory}><Switch><Login {...props} store={store} /></Switch></Router>);

  return {
    mountedWrapper,
    props
  };
};

describe('<Login', () => {
  it.only('renders without crashing', () => {
    const { mountedWrapper } = setup();
    expect(mountedWrapper).toBeDefined();
    expect(mountedWrapper.find('MainHeader').length).toBe(1);
    expect(mountedWrapper.find('Footer').length).toBe(1);
    expect(mountedWrapper.find('LoginForm').length).toBe(1);
    expect(mountedWrapper.find('RecoverPasswordModal').length).toBe(1);
    expect(true).toBe(true);
  });
  it('should call the login method', () => {
    const { mountedWrapper } = setup();
    const handleLoginSpy = jest.spyOn(mountedWrapper.instance(), 'loginUser');
    mountedWrapper.instance().loginUser(event);
    expect(handleLoginSpy).toHaveBeenCalledTimes(1);
  });
});
