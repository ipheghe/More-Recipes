import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import render from 'react-test-renderer';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedNavHeader, { NavHeader } from '../../../src/commonViews/NavHeader.jsx';
import mockAuthCheck from '../../__mocks__/mockAuthCheck';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  auth: {
    error: 'Invalid username',
    message: '',
    userData: {},
    authenticated: true,
    categories: []
  }
};

const store = mockStore(initialState);

const props = {
  authenticated: true
};

/**
 * @param { boolean } isAuthenticated
 *
 * @return { * } null
 */
const setup = (isAuthenticated) => {
  props.authenticated = isAuthenticated;
  const mountedWrapper = mount(<Provider store={store} ><ConnectedNavHeader {...props} /></Provider>);
  const shallowWrapper = shallow(<NavHeader {...props} />);
  return {
    mountedWrapper,
    shallowWrapper
  };
};

describe('<NavHeader', () => {
  beforeEach(() => {
    mockAuthCheck();
  });

  it('renders UserNavHeader component without crashing if user is authenticated ', () => {
    const { mountedWrapper } = setup(true);
    expect(mountedWrapper).toBeDefined();
    expect(mountedWrapper.find('UserNavHeader').length).toBe(1);
    expect(mountedWrapper.find('MainHeader').length).toBe(0);
    expect(mountedWrapper.exists()).toBe(true);
  });

  it('renders MainHeader component without crashing if user is not authenticated ', () => {
    const { shallowWrapper } = setup(false);
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('UserNavHeader').length).toBe(0);
    expect(shallowWrapper.find('MainHeader').length).toBe(1);
    expect(shallowWrapper.exists()).toBe(true);
  });

  it('should match component snapshot', () => {
    const tree = render.create(<Router ><NavHeader {...props} /></Router>);
    expect(tree).toMatchSnapshot();
  });
});
