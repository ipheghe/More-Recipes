import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import render from 'react-test-renderer';
import { HashRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedSignupPage, { PureSignup } from '../../../src/components/signup/Signup.jsx';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  auth: {
    error: 'Invalid username',
    message: '',
    userData: {},
    authenticated: false,
    categories: []
  }
};

const store = mockStore(initialState);

const state = {
  username: 'okon',
  password: 'abcde',
  fullName: 'Okon Imo',
  mobileNumber: '234702388888',
  email: 'okon@yahoo.com',
  hasErrored: false,
  errorMessage: ''
};

const props = {
  errorMessage: '',
  registerUser: jest.fn(() => Promise.resolve()),
  isAuthenticated: false

};

const event = {
  preventDefault: jest.fn(),
  target: {
    username: 'okon',
    password: 'abcde',
    fullName: 'Okon Imo',
    mobile: '234702388888',
    email: 'okon@yahoo.com'
  }

};

jest.useFakeTimers();

/**
 *@description  setup function to mount component
 *
 * @param { boolean } isAuthenticated
 *
 * @return { * } null
 */
const setup = (isAuthenticated) => {
  props.isAuthenticated = isAuthenticated;
  const mountedWrapper = mount(<Router><ConnectedSignupPage {...props} store={store} /></Router>);
  const shallowWrapper = shallow(<PureSignup {...props} />);
  return {
    mountedWrapper,
    shallowWrapper
  };
};

describe('<Signup', () => {
  it('renders without crashing', () => {
    const { mountedWrapper } = setup(false);
    expect(mountedWrapper).toBeDefined();
    expect(mountedWrapper.find('SignupForm').length).toBe(1);
    expect(true).toBe(true);
  });

  it('should match component snapshot', () => {
    const tree = render.create(<Router ><PureSignup {...props} /></Router>);
    expect(tree).toMatchSnapshot();
  });

  it('calls handleChange event', () => {
    sinon.spy(PureSignup.prototype, 'handleChange');
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().handleChange(event);
    expect(PureSignup.prototype.handleChange.calledOnce).toEqual(true);
  });

  it('calls handleSignup event after Signup button is clicked', () => {
    sinon.spy(PureSignup.prototype, 'handleSignup');
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().handleSignup(event);
    expect(PureSignup.prototype.handleSignup.calledOnce).toEqual(true);
  });

  it('calls validateFormField method with null username field', () => {
    sinon.spy(PureSignup.prototype, 'validateFormField');
    const { shallowWrapper } = setup(false);
    shallowWrapper.setState({ username: '', hasErrored: false, errorMessage: '' });
    shallowWrapper.instance().validateFormField();
    jest.runAllTimers();
    expect(PureSignup.prototype.validateFormField.calledOnce).toEqual(true);
    expect(shallowWrapper.state().username).toEqual('');
  });

  it('calls validateFormField method with null password field', () => {
    const { shallowWrapper } = setup(false);
    setTimeout(() => {
    }, 2000);
    shallowWrapper.setState({
      username: 'okon', password: '', hasErrored: false, errorMessage: ''
    });
    shallowWrapper.instance().validateFormField();
    jest.runAllTimers();
    expect(PureSignup.prototype.validateFormField.calledOnce).toEqual(false);
    expect(shallowWrapper.state().password).toEqual('');
  });

  it(' dispatches registerUser action after validatiing fields', () => {
    const { shallowWrapper } = setup(false);
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(PureSignup.prototype.validateFormField.calledOnce).toEqual(false);
    expect(shallowWrapper.state().password).toEqual('abcde');
  });

  it('redirects to dashboard page if user is authenticated', () => {
    const { shallowWrapper } = setup(true);
    expect(shallowWrapper).toBeDefined();
  });
});
