import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import render from 'react-test-renderer';
import { HashRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedLogin, { PureLogin }
  from '../../../src/components/login/Login.jsx';
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

jest.useFakeTimers();

/**
 * @param { boolean } isAuthenticated
 *
 * @return { * } null
 */
const setup = (isAuthenticated) => {
  props.isAuthenticated = isAuthenticated;
  const mountedWrapper = mount(<Router><ConnectedLogin {...props} store={store} /></Router>);
  const shallowWrapper = shallow(<PureLogin {...props} />);
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
    const tree = render.create(<Router ><PureLogin {...props} /></Router>);
    expect(tree).toMatchSnapshot();
  });

  it('calls componentWillReceiveProps if status props length > 0', () => {
    sinon.spy(PureLogin.prototype, 'componentWillReceiveProps');
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().componentWillReceiveProps(props);
    expect(PureLogin.prototype.componentWillReceiveProps.calledOnce).toEqual(true);
  });

  it('calls componentWillReceiveProps if status props length < 0', () => {
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().componentWillReceiveProps(nextProps);
    expect(PureLogin.prototype.componentWillReceiveProps.calledOnce).toEqual(false);
  });

  it('calls handleChange event', () => {
    sinon.spy(PureLogin.prototype, 'handleChange');
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().handleChange(event);
    expect(PureLogin.prototype.handleChange.calledOnce).toEqual(true);
  });

  it('calls handleLogin event after Login button is clicked', () => {
    sinon.spy(PureLogin.prototype, 'handleLogin');
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().handleLogin(event);
    expect(PureLogin.prototype.handleLogin.calledOnce).toEqual(true);
  });

  it('calls validateFormField method with null username field', () => {
    sinon.spy(PureLogin.prototype, 'validateFormField');
    const { shallowWrapper } = setup(false);
    shallowWrapper.setState({ username: '', hasErrored: false, errorMessage: '' });
    shallowWrapper.instance().validateFormField();
    jest.runAllTimers();
    expect(PureLogin.prototype.validateFormField.calledOnce).toEqual(true);
    expect(shallowWrapper.state().username).toEqual('');
    expect(shallowWrapper.state().hasErrored).toEqual(false);
    expect(shallowWrapper.state().errorMessage).toEqual('');
  });

  it('calls validateFormField method with null password field', () => {
    const { shallowWrapper } = setup(false);
    shallowWrapper.setState({
      username: 'okon', password: '', hasErrored: false, errorMessage: ''
    });
    shallowWrapper.instance().validateFormField();
    jest.runAllTimers();
    expect(PureLogin.prototype.validateFormField.calledOnce).toEqual(false);
    expect(shallowWrapper.state().password).toEqual('');
    expect(shallowWrapper.state().hasErrored).toEqual(false);
    expect(shallowWrapper.state().errorMessage).toEqual('');
  });

  it(' dispatches LoginUser action after validatiing fields', () => {
    const { shallowWrapper } = setup(false);
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(PureLogin.prototype.validateFormField.calledOnce).toEqual(false);
    expect(shallowWrapper.state().password).toEqual('abcde');
  });

  it('calls openModal event when forgot password link is clicked', () => {
    sinon.spy(PureLogin.prototype, 'openModal');
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().openModal(event);
    expect(PureLogin.prototype.openModal.calledOnce).toEqual(true);
  });

  it('calls closeModal event', () => {
    sinon.spy(PureLogin.prototype, 'closeModal');
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().closeModal(event);
    expect(PureLogin.prototype.closeModal.calledOnce).toEqual(true);
  });

  it('calls handleResetPassword event and displays error for null email', () => {
    sinon.spy(PureLogin.prototype, 'handleResetPassword');
    const { shallowWrapper } = setup(false);
    shallowWrapper.setState({
      username: 'okon', password: '', email: '', hasErrored: false, errorMessage: ''
    });
    shallowWrapper.instance().handleResetPassword(event);
    jest.runAllTimers();
    expect(PureLogin.prototype.handleResetPassword.calledOnce).toEqual(true);
    expect(shallowWrapper.state().email).toEqual('');
  });

  it('calls handleResetPassword event and dispatches resetPassword action', () => {
    const { shallowWrapper } = setup(false);
    shallowWrapper.setState(state);
    shallowWrapper.instance().handleResetPassword(event);
    expect(PureLogin.prototype.handleResetPassword.calledOnce).toEqual(false);
    expect(shallowWrapper.state().email).toEqual('');
  });

  it('calls renderModalAlert method when props.errorMessage is true', () => {
    props.modalErrorMessage = 'true';
    const shallowWrapper = shallow(<PureLogin {...props} />);
    expect(shallowWrapper).toBeDefined();
  });

  it('redirects to dashboard page if user is authenticated', () => {
    const { shallowWrapper } = setup(true);
    expect(shallowWrapper).toBeDefined();
  });
});
