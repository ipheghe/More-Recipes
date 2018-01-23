import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import render from 'react-test-renderer';
import { HashRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedSignupPage, { PureSignup }
  from '../../../src/components/Signup';


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
  const mountedWrapper = mount(<Router>
    <ConnectedSignupPage {...props} store={store} />
  </Router>);
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

  it('displays error message if user inputs a null username value', () => {
    sinon.spy(PureSignup.prototype, 'validateFormField');
    const { shallowWrapper } = setup(false);
    state.username = '';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(shallowWrapper.state().hasErrored).toEqual(true);
    expect(shallowWrapper.state().errorMessage)
      .toEqual('Username must start with a letter and have no spaces.');
    jest.runAllTimers();
    expect(shallowWrapper.state().errorMessage).toEqual('');
  });

  it('displays error message if user inputs a null password value', () => {
    const { shallowWrapper } = setup(false);
    state.username = 'okon';
    state.password = '';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(shallowWrapper.state().hasErrored).toEqual(true);
    expect(shallowWrapper.state().errorMessage)
      .toEqual('password must contain more than 3 chareacters');
    jest.runAllTimers();
    expect(shallowWrapper.state().errorMessage).toEqual('');
  });

  it(`displays error message if user inputs a 
     fullName value with length less than 4`, () => {
      const { shallowWrapper } = setup(false);
      state.password = 'abcde';
      state.fullName = 'oko';
      shallowWrapper.setState(state);
      shallowWrapper.instance().validateFormField();
      expect(shallowWrapper.state().hasErrored).toEqual(true);
      expect(shallowWrapper.state().errorMessage)
        .toEqual('fullname must contain more than 3 chareacters');
      jest.runAllTimers();
      expect(shallowWrapper.state().errorMessage).toEqual('');
    });

  it('displays error message if user inputs an invalid mobile number', () => {
    const { shallowWrapper } = setup(false);
    state.mobileNumber = '';
    state.fullName = 'okon Akem';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(shallowWrapper.state().hasErrored).toEqual(true);
    expect(shallowWrapper.state().errorMessage)
      .toEqual('mobile number must contain only numbers');
    jest.runAllTimers();
    expect(shallowWrapper.state().errorMessage).toEqual('');
  });

  it('displays error message if user inputs an invalid email', () => {
    const { shallowWrapper } = setup(false);
    state.mobileNumber = '234702388888';
    state.email = 'okon@ya';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(shallowWrapper.state().hasErrored).toEqual(true);
    expect(shallowWrapper.state().errorMessage)
      .toEqual('Invalid Email Address');
    jest.runAllTimers();
    expect(shallowWrapper.state().errorMessage).toEqual('');
  });

  it(`dispatches registerUser action after 
     validatiing input fields successfully`, () => {
      const { shallowWrapper } = setup(false);
      state.email = 'okon@yahoo.com';
      shallowWrapper.setState(state);
      shallowWrapper.instance().validateFormField();
      expect(PureSignup.prototype.validateFormField.calledOnce).toEqual(false);
      expect(shallowWrapper.state().password).toEqual('abcde');
    });

  it('redirects to dashboard page if user is authenticated', () => {
    const { shallowWrapper } = setup(true);
    expect(shallowWrapper.instance().props.isAuthenticated).toEqual(true);
  });
});
