import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import render from 'react-test-renderer';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedUserNavHeader, { PureUserNavHeader }
  from '../../../src/commonViews/UserNavHeader.jsx';
import mockAuthCheck from '../../__mocks__/mockAuthCheck';
import mockItems from '../../__mocks__/mockItems';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  auth: {
    error: '',
    message: '',
    userData: mockItems.user,
    authenticated: false,
    categories: []
  }
};

const store = mockStore(initialState);

const state = {
  userData: mockItems.user,
  isLoading: false
};

const props = {
  fetchUsername: jest.fn(() => Promise.resolve()),
  getUserCategories: jest.fn(() => Promise.resolve()),
  logoutUser: jest.fn(() => Promise.resolve()),
  userData: mockItems.user
};

/**
 * @description setup function to mount component
 *
 * @return { object } mountedWrapper, shallowWrapper
 */
const setup = () => {
  const mountedWrapper = mount(<Provider store={store} ><ConnectedUserNavHeader {...props} /></Provider>);
  const shallowWrapper = shallow(<PureUserNavHeader {...props} />);
  return {
    mountedWrapper,
    shallowWrapper
  };
};

describe('<NavHeader', () => {
  beforeEach(() => {
    mockAuthCheck();
  });

  it(`renders UserNavHeader component without
     crashing if userData object is not empty`, () => {
      const { shallowWrapper } = setup();
      shallowWrapper.setState(state);
      expect(shallowWrapper).toBeDefined();
      expect(shallowWrapper.find('Link').length).toBe(1);
      expect(shallowWrapper.exists()).toBe(true);
    });

  it(`renders Loader component without crashing
     if userData object is empty`, () => {
      const { mountedWrapper } = setup();
      mountedWrapper.setState({ userData: {} });
      expect(mountedWrapper).toBeDefined();
      expect(mountedWrapper.find('Link').length).toBe(0);
      expect(mountedWrapper.exists()).toBe(true);
    });

  it('should match component snapshot', () => {
    const tree = render.create(<Router ><PureUserNavHeader {...props} /></Router>);
    expect(tree).toMatchSnapshot();
  });

  it(`calls componentWillReceiveProps if
      userData object from props is available`, () => {
      sinon.spy(PureUserNavHeader.prototype, 'componentWillReceiveProps');
      const { shallowWrapper } = setup();
      shallowWrapper.instance().componentWillReceiveProps(props);
      expect(PureUserNavHeader.prototype.componentWillReceiveProps.calledOnce)
        .toEqual(true);
    });

  it(`doest not call componentWillReceiveProps
     method if userData object is null`, () => {
      props.userData = null;
      const shallowWrapper = shallow(<PureUserNavHeader {...props} />);
      shallowWrapper.instance().componentWillReceiveProps(props);
      expect(PureUserNavHeader.prototype.componentWillReceiveProps.calledOnce)
        .toEqual(false);
    });

  it(' dispatches logoutUser action when logout button is clicked', () => {
    sinon.spy(PureUserNavHeader.prototype, 'handleLogout');
    const { shallowWrapper } = setup();
    const event = {
      preventDefault: jest.fn()
    };
    shallowWrapper.instance().handleLogout(event);
    expect(PureUserNavHeader.prototype.handleLogout.calledOnce).toEqual(true);
  });

  it(`renders to editProfile component when
     the full name link is clicked`, () => {
      const { shallowWrapper } = setup();
      shallowWrapper.setState(state);
      expect(shallowWrapper).toBeDefined();
      expect(shallowWrapper.find('.nav-link.invisible-button.nav-name')
        .simulate('click'));
    });
});
