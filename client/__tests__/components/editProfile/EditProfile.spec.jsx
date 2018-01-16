import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import render from 'react-test-renderer';
import { HashRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedEditProfile, { PureEditProfile }
  from '../../../src/components/editProfile/EditProfile.jsx';
import mockItems from '../../__mocks__/mockItems';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  auth: {
    error: 'Invalid username',
    message: '',
    userData: mockItems.user,
    authenticated: false,
    categories: []
  },
  user: {
    status: '',
    error: '',
    message: '',
    userData: mockItems.user,
  },
  category: {
    error: '',
    message: '',
    categoryList: [mockItems.category],
    userCategoryList: [mockItems.category]
  },
};

const store = mockStore(initialState);

const props = {
  errorMessage: '',
  updateUserRecord: jest.fn(() => Promise.resolve()),
  userData: mockItems.user
};

const state = {
  username: props.username,
  fullName: props.fullName,
  mobileNumber: props.mobileNumber,
  email: props.email,
  hasErrored: false,
  errorMessage: ''
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
 * @return { * } null
 */
const setup = () => {
  const mountedWrapper = mount(<Provider store={store}>
    <Router><ConnectedEditProfile {...props} /></Router>
                               </Provider>);
  const shallowWrapper = shallow(<PureEditProfile {...props} />);
  return {
    mountedWrapper,
    shallowWrapper
  };
};

describe('<PureEditProfile', () => {
  it('renders without crashing', () => {
    const { mountedWrapper } = setup();
    mountedWrapper.setState(state);
    expect(mountedWrapper).toBeDefined();
    expect(mountedWrapper.find('EditProfileForm').length).toBe(1);
    expect(true).toBe(true);
  });

  it('should match component snapshot', () => {
    const tree = render.create(<Provider store={store}>
      <Router><ConnectedEditProfile {...props} /></Router>
                               </Provider>);
    expect(tree).toMatchSnapshot();
  });

  it('calls handleChange event', () => {
    sinon.spy(PureEditProfile.prototype, 'handleChange');
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().handleChange(event);
    expect(PureEditProfile.prototype.handleChange.calledOnce).toEqual(true);
  });

  it('calls componentWillReceiveProps if userData from props is available', () => {
    sinon.spy(PureEditProfile.prototype, 'componentWillReceiveProps');
    const { shallowWrapper } = setup();
    shallowWrapper.instance().componentWillReceiveProps(props);
    expect(PureEditProfile.prototype.componentWillReceiveProps.calledOnce).toEqual(true);
  });

  it('calls handleUpdate event after update button is clicked', () => {
    sinon.spy(PureEditProfile.prototype, 'handleUpdate');
    const { shallowWrapper } = setup();
    shallowWrapper.instance().handleUpdate(event);
    expect(PureEditProfile.prototype.handleUpdate.calledOnce).toEqual(true);
  });

  it('calls validateFormField method with null username field', () => {
    sinon.spy(PureEditProfile.prototype, 'validateFormField');
    const { shallowWrapper } = setup();
    state.username = '';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    jest.runAllTimers();
    expect(PureEditProfile.prototype.validateFormField.calledOnce)
      .toEqual(true);
    expect(shallowWrapper.state().username).toEqual('');
  });

  it('calls validateFormField method with null fullName  field', () => {
    const { shallowWrapper } = setup();
    state.fullName = '';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    jest.runAllTimers();
    expect(PureEditProfile.prototype.validateFormField.calledOnce)
      .toEqual(false);
    expect(shallowWrapper.state().fullName).toEqual('');
  });

  it('calls validateFormField method with null mobileNumber field', () => {
    const { shallowWrapper } = setup();
    state.mobileNumber = '';
    state.username = 'okon';
    state.fullName = 'Okon essien';
    state.email = '';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    jest.runAllTimers();
    expect(PureEditProfile.prototype.validateFormField.calledOnce)
      .toEqual(false);
    expect(shallowWrapper.state().mobileNumber).toEqual('');
    expect(shallowWrapper.state().hasErrored).toEqual(false);
  });

  it(' dispatches updateUser action after validatiing fields', () => {
    const { shallowWrapper } = setup();
    state.email = 'okon@yahoo.com';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(PureEditProfile.prototype.validateFormField.calledOnce)
      .toEqual(false);
    expect(shallowWrapper.state().username).toEqual('okon');
  });

  it('calls toggleModalState method', () => {
    sinon.spy(PureEditProfile.prototype, 'toggleModalState');
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    shallowWrapper.instance().toggleModalState();
    expect(PureEditProfile.prototype.toggleModalState.calledOnce)
      .toEqual(true);
  });

  it('calls toggleModalStateOff method', () => {
    sinon.spy(PureEditProfile.prototype, 'toggleModalStateOff');
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    shallowWrapper.instance().toggleModalStateOff();
    expect(PureEditProfile.prototype.toggleModalStateOff.calledOnce)
      .toEqual(true);
  });
});
