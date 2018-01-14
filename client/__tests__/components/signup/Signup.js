import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import {
  Switch,
  HashRouter as Router, hashHistory
} from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Signup from '../../../src/components/signup/Signup.jsx';

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
};
const store = mockStore(initialState);

/**
 *
 * @return { * } null
 */
const setup = () => {
  const props = {
    registerUser: jest.fn(),
    errorMessage: ''
  };
  const wrapper = mount(<Router history={hashHistory}><Switch><Signup {...props} store={store} /></Switch></Router>);

  return {
    wrapper
  };
};

describe('<Signup', () => {
  it('renders without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.find('MainHeader').length).toBe(1);
    expect(wrapper.find('Footer').length).toBe(1);
    expect(wrapper.find('SignupForm').length).toBe(1);
    expect(wrapper.exists()).toBe(true);
  });
  it('allows us to set props', () => {
    const { wrapper } = setup();
    wrapper.setProps({ username: 'okon' });
    expect(wrapper.props().username).toEqual('okon');
  });
});
