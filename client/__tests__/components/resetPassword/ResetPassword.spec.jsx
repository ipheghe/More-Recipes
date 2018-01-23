import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import render from 'react-test-renderer';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedResetPassword, { PureResetPassword }
  from '../../../src/components/ResetPassword';
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
  const mountedWrapper = mount(<Provider store={store} >
    <ConnectedResetPassword {...props} store={store} />
  </Provider>);
  const shallowWrapper = shallow(<PureResetPassword {...props} />);
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
    const tree = render.create(<PureResetPassword {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('calls handleChange event', () => {
    sinon.spy(PureResetPassword.prototype, 'handleChange');
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().handleChange(event);
    expect(PureResetPassword.prototype.handleChange.calledOnce).toEqual(true);
  });

  it(`calls handleResetPassword event after 
     change password button is clicked`, () => {
      sinon.spy(PureResetPassword.prototype, 'handleResetPassword');
      const { shallowWrapper } = setup(false);
      shallowWrapper.instance().handleResetPassword(event);
      expect(PureResetPassword.prototype.handleResetPassword.calledOnce)
        .toEqual(true);
    });

  it('displays error message if user inputs null confirm password', () => {
    sinon.spy(PureResetPassword.prototype, 'validateFormField');
    const { shallowWrapper } = setup(false);
    state.confirmPassword = '';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(shallowWrapper.state().hasErrored).toEqual(true);
    expect(shallowWrapper.state().errorMessage)
      .toEqual('confirm password field cannot be empty');
    jest.runAllTimers();
    expect(shallowWrapper.state().errorMessage).toEqual('');
  });

  it('displays error message if user inputs null new password', () => {
    const { shallowWrapper } = setup(false);
    state.newPassword = '';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(shallowWrapper.state().hasErrored).toEqual(true);
    expect(shallowWrapper.state().errorMessage)
      .toEqual('new password field cannot be empty');
    jest.runAllTimers();
    expect(shallowWrapper.state().errorMessage).toEqual('');
  });

  it(`displays error message if confirm password value 
     is different from new password value`, () => {
      const { shallowWrapper } = setup(false);
      state.newPassword = 'abcde';
      state.confirmPassword = 'abcdhhhhe';
      shallowWrapper.setState(state);
      shallowWrapper.instance().validateFormField();
      expect(shallowWrapper.state().hasErrored).toEqual(true);
      expect(shallowWrapper.state().newPassword).toEqual('abcde');
      expect(shallowWrapper.state().confirmPassword).toEqual('abcdhhhhe');
      expect(shallowWrapper.state().errorMessage)
        .toEqual('Password mismatch!');
      jest.runAllTimers();
      expect(shallowWrapper.state().errorMessage).toEqual('');
    });

  it(`dispatches resetPassword action after 
     validatiing form fields successfully`, () => {
      const { shallowWrapper } = setup(false);
      state.newPassword = 'abcde';
      state.confirmPassword = 'abcde';
      shallowWrapper.setState(state);
      shallowWrapper.instance().validateFormField();
      expect(PureResetPassword.prototype.validateFormField.calledOnce)
        .toEqual(false);
      expect(shallowWrapper.state().errorMessage).toEqual('');
    });

  it('redirects to dashboard page if user is authenticated', () => {
    const { shallowWrapper } = setup(true);
    expect(shallowWrapper.instance().props.isAuthenticated).toEqual(true);
  });
});
