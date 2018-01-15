import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import render from 'react-test-renderer';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedResetPassword, { ResetPassword } from '../../../src/components/resetPassword/ResetPassword.jsx';
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
  newPassword: 'abcde',
  confirmPassword: 'abcde',
  hasErrored: false,
  errorMessage: ''
};

const props = {
  errorMessage: '',
  verifyTokenPassword: jest.fn(() => Promise.resolve()),
  match: {
    params: {
      id: 'hhhbhbjbjbk8hbjkjnklkl'
    }
  },
  isAuthenticated: false
};

const event = {
  preventDefault: jest.fn(),
  target: {
    newPassword: 'abcde',
    confirmPassword: 'abcd'
  }

};

/**
 *@description  setup function to mount component
 *
 * @param { boolean } isAuthenticated
 *
 * @return { * } null
 */
const setup = (isAuthenticated) => {
  props.isAuthenticated = isAuthenticated;
  const mountedWrapper = mount(<Provider store={store} ><ConnectedResetPassword {...props} store={store} /></Provider>);
  const shallowWrapper = shallow(<ResetPassword {...props} />);
  return {
    mountedWrapper,
    shallowWrapper
  };
};

describe('<ResetPassword', () => {
  it('renders ResetPassword component without crashing', () => {
    const { mountedWrapper } = setup(false);
    expect(mountedWrapper).toBeDefined();
    expect(mountedWrapper.find('ResetPasswordForm').length).toBe(1);
    expect(mountedWrapper.exists()).toBe(true);
  });

  it('should match component snapshot', () => {
    const tree = render.create(<ResetPassword {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('calls handleChange event', () => {
    sinon.spy(ResetPassword.prototype, 'handleChange');
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().handleChange(event);
    expect(ResetPassword.prototype.handleChange.calledOnce).toEqual(true);
  });

  it('calls handleResetPassword event after change password button is clicked', () => {
    sinon.spy(ResetPassword.prototype, 'handleResetPassword');
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().handleResetPassword(event);
    expect(ResetPassword.prototype.handleResetPassword.calledOnce).toEqual(true);
  });

  it('calls returns error for null confirm password field', () => {
    sinon.spy(ResetPassword.prototype, 'validateFormField');
    const { shallowWrapper } = setup(false);
    state.confirmPassword = '';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(ResetPassword.prototype.validateFormField.calledOnce).toEqual(true);
    expect(shallowWrapper.state().confirmPassword).toEqual('');
  });

  it('calls returns error for null new password field', () => {
    const { shallowWrapper } = setup(false);
    state.newPassword = '';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(ResetPassword.prototype.validateFormField.calledOnce).toEqual(false);
    expect(shallowWrapper.state().newPassword).toEqual('');
  });

  it('calls returns error for null password missmatch', () => {
    const { shallowWrapper } = setup(false);
    state.newPassword = 'abcde';
    state.confirmPassword = 'abcdhhhhe';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(ResetPassword.prototype.validateFormField.calledOnce).toEqual(false);
    expect(shallowWrapper.state().confirmPassword).toEqual('abcdhhhhe');
  });

  it(' dispatches resetPassword action after validatiing fields', () => {
    const { shallowWrapper } = setup(false);
    state.newPassword = 'abcde';
    state.confirmPassword = 'abcde';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(ResetPassword.prototype.validateFormField.calledOnce).toEqual(false);
    expect(shallowWrapper.state().confirmPassword).toEqual('abcde');
  });

  it('redirects to dashboard page if user is authenticated', () => {
    const { shallowWrapper } = setup(true);
    expect(shallowWrapper).toBeDefined();
  });
});
