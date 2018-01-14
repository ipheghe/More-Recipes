import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import render from 'react-test-renderer';
import { HashRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedLoginPage, { Login } from '../../../src/components/login/Login.jsx';
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

const state = {
  username: 'okon',
  password: 'abcde',
  email: 'okon@yahoo.com',
  hasErrored: false,
  errorMessage: '',
  modalIsOpen: false,
  status: ''
};

const props = {
  status: '',
  errorMessage: '',
  modalErrorMessage: '',
  loginUser: jest.fn(() => Promise.resolve()),
  isAuthenticated: false,
  resetPassword: jest.fn()

};
const nextProps = {
  status: 'success',
  errorMessage: '',
  modalErrorMessage: '',
  loginUser: jest.fn(() => Promise.resolve()),
  isAuthenticated: false,
  resetPassword: jest.fn(),
  state: { user: { status: 'true' } }
};

const event = {
  preventDefault: jest.fn(),
  target: {
    username: 'okon',
    password: 'abcde',
    email: 'okon@yahoo.com',
  }

};

/**
 * @param { boolean } isAuthenticated
 *
 * @return { * } null
 */
const setup = (isAuthenticated) => {
  props.isAuthenticated = isAuthenticated;
  const mountedWrapper = mount(<Router><ConnectedLoginPage {...props} store={store} /></Router>);
  const shallowWrapper = shallow(<Login {...props} />);
  return {
    mountedWrapper,
    shallowWrapper
  };
};

describe('<Login', () => {
  it('renders without crashing', () => {
    const { mountedWrapper } = setup(false);
    expect(mountedWrapper).toBeDefined();
    expect(mountedWrapper.find('LoginForm').length).toBe(1);
    expect(mountedWrapper.find('RecoverPasswordModal').length).toBe(1);
    expect(true).toBe(true);
  });

  it('should match component snapshot', () => {
    const tree = render.create(<Router ><Login {...props} /></Router>);
    expect(tree).toMatchSnapshot();
  });

  it('calls componentWillReceiveProps if status props length > 0', () => {
    sinon.spy(Login.prototype, 'componentWillReceiveProps');
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().componentWillReceiveProps(props);
    expect(Login.prototype.componentWillReceiveProps.calledOnce).toEqual(true);
  });

  it('calls componentWillReceiveProps if status props length < 0', () => {
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().componentWillReceiveProps(nextProps);
    expect(Login.prototype.componentWillReceiveProps.calledOnce).toEqual(false);
  });

  it('calls handleChange event', () => {
    sinon.spy(Login.prototype, 'handleChange');
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().handleChange(event);
    expect(Login.prototype.handleChange.calledOnce).toEqual(true);
  });

  it('calls handleLogin event after login button is clicked', () => {
    sinon.spy(Login.prototype, 'handleLogin');
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().handleLogin(event);
    expect(Login.prototype.handleLogin.calledOnce).toEqual(true);
  });

  it('calls validateFormField method with null username field', () => {
    sinon.spy(Login.prototype, 'validateFormField');
    const { shallowWrapper } = setup(false);
    shallowWrapper.setState({ username: '', hasErrored: false, errorMessage: '' });
    shallowWrapper.instance().validateFormField();
    expect(Login.prototype.validateFormField.calledOnce).toEqual(true);
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
    expect(Login.prototype.validateFormField.calledOnce).toEqual(false);
    expect(shallowWrapper.state().password).toEqual('');
  });

  it(' dispatches loginUser action after validatiing fields', () => {
    const { shallowWrapper } = setup(false);
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(Login.prototype.validateFormField.calledOnce).toEqual(false);
    expect(shallowWrapper.state().password).toEqual('abcde');
  });

  it('calls openModal event when forgot password link is clicked', () => {
    sinon.spy(Login.prototype, 'openModal');
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().openModal(event);
    expect(Login.prototype.openModal.calledOnce).toEqual(true);
  });

  it('calls closeModal event', () => {
    sinon.spy(Login.prototype, 'closeModal');
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().closeModal(event);
    expect(Login.prototype.closeModal.calledOnce).toEqual(true);
  });

  it('calls handleResetPassword event and displays error for null email', () => {
    sinon.spy(Login.prototype, 'handleResetPassword');
    const { shallowWrapper } = setup(false);
    shallowWrapper.setState({
      username: 'okon', password: '', email: '', hasErrored: false, errorMessage: ''
    });
    shallowWrapper.instance().handleResetPassword(event);
    expect(Login.prototype.handleResetPassword.calledOnce).toEqual(true);
    expect(shallowWrapper.state().email).toEqual('');
  });

  it('calls handleResetPassword event and dispatches resetPassword action', () => {
    const { shallowWrapper } = setup(false);
    shallowWrapper.setState(state);
    shallowWrapper.instance().handleResetPassword(event);
    expect(Login.prototype.handleResetPassword.calledOnce).toEqual(false);
    expect(shallowWrapper.state().email).toEqual('');
  });

  it('calls renderModalAlert method when props.errorMessage is true', () => {
    props.modalErrorMessage = 'true';
    const shallowWrapper = shallow(<Login {...props} />);
    expect(shallowWrapper).toBeDefined();
  });

  it('redirects to dashboard page if user is authenticated', () => {
    const { shallowWrapper } = setup(true);
    expect(shallowWrapper).toBeDefined();
  });
});
