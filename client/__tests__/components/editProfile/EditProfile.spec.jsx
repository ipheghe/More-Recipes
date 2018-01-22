import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import render from 'react-test-renderer';
import { HashRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedEditProfile, { PureEditProfile }
  from '../../../src/components/editProfile/EditProfile.jsx';
import mockItems from '../../__mocks__/mockItems';
import mockAuthCheck from '../../__mocks__/mockAuthCheck';


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
  fetchUsername: jest.fn(() => Promise.resolve()),
  userData: mockItems.user
};

const state = {
  username: 'okon',
  fullName: 'abcde',
  mobileNumber: '234702388888',
  email: 'okon@yahoo.com',
  hasErrored: false,
  errorMessage: '',
  isLoading: false
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
  const shallowWrapper = shallow(<PureEditProfile {...props} />);
  return {
    shallowWrapper
  };
};

describe('<PureEditProfile', () => {
  beforeEach(() => {
    mockAuthCheck();
  });

  it(`should render a loader component before 
  MyRecipes component receives needed props`, () => {
      props.userData = null;
      const shallowWrapper = shallow(<PureEditProfile {...props} />);
      shallowWrapper.setState({ isLoading: true });
      expect(shallowWrapper).toBeDefined();
      expect(shallowWrapper.find('Loader').length).toBe(1);
      expect(shallowWrapper.exists()).toBe(true);
    });

  it('renders without crashing', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('EditProfileForm').length).toBe(1);
    expect(shallowWrapper.exists()).toBe(true);
  });

  it('should match component snapshot', () => {
    const tree = render
      .create(<Provider store={store}>
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

  it(`calls componentWillReceiveProps if 
    userData from props is available`, () => {
      sinon.spy(PureEditProfile.prototype, 'componentWillReceiveProps');
      const { shallowWrapper } = setup();
      shallowWrapper.instance().componentWillReceiveProps(props);
      expect(PureEditProfile.prototype.componentWillReceiveProps.calledOnce)
        .toEqual(true);
    });

  it('calls handleUpdate event after update button is clicked', () => {
    sinon.spy(PureEditProfile.prototype, 'handleUpdate');
    const { shallowWrapper } = setup();
    shallowWrapper.instance().handleUpdate(event);
    expect(PureEditProfile.prototype.handleUpdate.calledOnce).toEqual(true);
  });

  it('displays error message if user inputs a null username value', () => {
    sinon.spy(PureEditProfile.prototype, 'validateFormField');
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

  it(`displays error message if user inputs a 
     fullName value with length less than 4`, () => {
      const { shallowWrapper } = setup(false);
      state.username = 'okon';
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
    expect(shallowWrapper.state().errorMessage)
      .toEqual('Invalid Email Address');
    jest.runAllTimers();
    expect(shallowWrapper.state().errorMessage).toEqual('');
  });

  it('dispatches updateUser action after validatiing fields', () => {
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
