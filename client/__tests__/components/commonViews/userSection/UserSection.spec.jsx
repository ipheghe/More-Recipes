import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import render from 'react-test-renderer';
import { HashRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedUserSection, { PureUserSection }
  from '../../../../src/commonViews/UserSection';
import mockItems from '../../../__mocks__/mockItems';


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
    error: 'Fail',
    message: '',
    userData: mockItems.user,
  },
  category: {
    error: '',
    message: '',
    categoryList: [mockItems.category],
    userCategoryList: [mockItems.category]
  }
};

const store = mockStore(initialState);

const state = {
  categoryName: 'cakes',
  modalCategoryName: 'wine',
  oldPassword: 'abcde',
  newPassword: 'abcdef',
  confirmPassword: 'abcdef',
  hasErrored: false,
  status: '',
  errorMessage: '',
  modalIsOpen: false,
  passwordModalIsOpen: false
};

const props = {
  addCategory: jest.fn(() => Promise.resolve()),
  updateCategory: jest.fn(() => Promise.resolve()),
  deleteCategory: jest.fn(() => Promise.resolve()),
  getUserCategory: jest.fn(() => Promise.resolve()),
  changePassword: jest.fn(() => Promise.resolve()),
  logoutUser: jest.fn(() => Promise.resolve()),
  modalOpen: jest.fn(),
  modalClosed: jest.fn(),
  userData: mockItems.user,
  categoryList: [mockItems.category],
  status: 'Fail',
  errorMessage: '',
  categories: [mockItems.category]
};

const nextProps = {
  categoryList: [],
  status: '',
};

const event = {
  preventDefault: jest.fn(),
  target: {
    categoryName: 'cakes',
    modalCategoryName: 'wine',
    oldPassword: 'abcde',
    newPassword: 'abcdef',
    confirmPassword: 'abcdef',
  }
};

jest.useFakeTimers();

/**
 *@description  setup function to mount component
 *
 * @return { object } mountedWrapper, shallowWrapper
 */
const setup = () => {
  const mountedWrapper = mount(<Router>
    <ConnectedUserSection {...props} store={store} />
  </Router>);
  const shallowWrapper = shallow(<PureUserSection {...props} />);
  return {
    mountedWrapper,
    shallowWrapper
  };
};

describe('<UserSection', () => {
  it('renders without crashing', () => {
    const { mountedWrapper } = setup();
    expect(mountedWrapper).toBeDefined();
    expect(mountedWrapper.find('ManageCategoryModal').length).toBe(1);
    expect(mountedWrapper.find('ChangePasswordModal').length).toBe(1);
    expect(true).toBe(true);
  });

  it('should match component snapshot', () => {
    const tree = render.create(<Router >
      <PureUserSection {...props} />
                               </Router>);
    expect(tree).toMatchSnapshot();
  });

  it('calls componentWillReceiveProps if status props ' +
  'length > 0 or categoryList length > 0', () => {
    sinon.spy(PureUserSection.prototype, 'componentWillReceiveProps');
    const { shallowWrapper } = setup();
    shallowWrapper.instance().componentWillReceiveProps(props);
    expect(PureUserSection.prototype.componentWillReceiveProps.calledOnce)
      .toEqual(true);
  });

  it('calls componentWillReceiveProps if status ' +
  'props status is Success', () => {
    props.status = 'Success';
    const shallowWrapper = shallow(<PureUserSection {...props} />);
    shallowWrapper.instance().componentWillReceiveProps(props);
    expect(PureUserSection.prototype.componentWillReceiveProps.calledOnce)
      .toEqual(false);
  });

  it('doesnt call componentWillReceiveProps if status props ' +
  'length < 0 and categoryList length < 0', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.instance().componentWillReceiveProps(nextProps);
    expect(PureUserSection.prototype.componentWillReceiveProps.calledOnce)
      .toEqual(false);
  });

  it('calls handleChange event', () => {
    sinon.spy(PureUserSection.prototype, 'handleChange');
    const { shallowWrapper } = setup();
    shallowWrapper.instance().handleChange(event);
    expect(PureUserSection.prototype.handleChange.calledOnce).toEqual(true);
  });

  it('calls handleChangePassword event', () => {
    sinon.spy(PureUserSection.prototype, 'handleChangePassword');
    const { shallowWrapper } = setup();
    shallowWrapper.instance().handleChangePassword(event);
    expect(PureUserSection.prototype.handleChangePassword.calledOnce)
      .toEqual(true);
  });

  it('calls validateFormField method with null confirm password field', () => {
    sinon.spy(PureUserSection.prototype, 'validateFormField');
    const { shallowWrapper } = setup();
    state.confirmPassword = '';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    jest.runAllTimers();
    expect(PureUserSection.prototype.validateFormField.calledOnce)
      .toEqual(true);
    expect(shallowWrapper.state().confirmPassword).toEqual('');
  });

  it('calls validateFormField method with null new password field', () => {
    const { shallowWrapper } = setup(false);
    state.newPassword = '';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    jest.runAllTimers();
    expect(PureUserSection.prototype.validateFormField.calledOnce)
      .toEqual(false);
    expect(shallowWrapper.state().newPassword).toEqual('');
  });

  it('calls validateFormField method with null old password field', () => {
    const { shallowWrapper } = setup();
    state.oldPassword = '';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    jest.runAllTimers();
    expect(PureUserSection.prototype.validateFormField.calledOnce)
      .toEqual(false);
    expect(shallowWrapper.state().oldPassword).toEqual('');
  });

  it('calls validateFormField method with password mismatch', () => {
    const { shallowWrapper } = setup();
    state.oldPassword = 'bell';
    state.confirmPassword = 'abhhhcde';
    state.newPassword = 'abcde';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    jest.runAllTimers();
    expect(PureUserSection.prototype.validateFormField.calledOnce)
      .toEqual(false);
    expect(shallowWrapper.state().newPassword).toEqual('abcde');
    expect(shallowWrapper.state().confirmPassword).toEqual('abhhhcde');
  });

  it(' dispatches changePassword action after validatiing fields', () => {
    const { shallowWrapper } = setup();
    state.confirmPassword = 'abcde';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(PureUserSection.prototype.validateFormField.calledOnce)
      .toEqual(false);
    expect(shallowWrapper.state().confirmPassword).toEqual('abcde');
  });

  it('renders the editProfile component when edit ' +
  'profile link is clicked', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('.invisible-button.nav-editProfile')
      .simulate('click'));
  });

  it('renders the change password modal component ' +
  'when change password link is clicked', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('.invisible-button.nav-changePassword')
      .simulate('click'));
  });

  it('calls the getCategories function when a category is clicked', () => {
    const { shallowWrapper } = setup();
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('.btn-sm').simulate('click'));
  });

  it('calls closeModal event', () => {
    sinon.spy(PureUserSection.prototype, 'closeModal');
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().closeModal(event);
    expect(PureUserSection.prototype.closeModal.calledOnce).toEqual(true);
  });

  it('calls addCategory action', () => {
    sinon.spy(PureUserSection.prototype, 'handleAddCategory');
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    shallowWrapper.instance().handleAddCategory(event);
    expect(PureUserSection.prototype.handleAddCategory.calledOnce)
      .toEqual(true);
  });


  it('calls updateCategory action', () => {
    sinon.spy(PureUserSection.prototype, 'handleUpdateCategory');
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    shallowWrapper.instance().handleUpdateCategory(event);
    expect(PureUserSection.prototype.handleUpdateCategory.calledOnce)
      .toEqual(true);
  });

  it('calls deleteCategory action', () => {
    sinon.spy(PureUserSection.prototype, 'handleDeleteCategory');
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    shallowWrapper.instance().handleDeleteCategory(event);
    expect(PureUserSection.prototype.handleDeleteCategory.calledOnce)
      .toEqual(true);
  });
});
