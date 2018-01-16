import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import render from 'react-test-renderer';
import sinon from 'sinon';
import { HashRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedUserProfileHeader, { PureProfileHeader } from '../../../src/commonViews/ProfileHeader.jsx';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {};

const store = mockStore(initialState);

const state = {
  keyword: '',
};

const props = {
  getRecipesBySearch: jest.fn(() => Promise.resolve())
};

const event = {
  preventDefault: jest.fn(),
  target: {
    keyword: 'spaghetti'
  }
};

/**
 * @description setup function to mount component
 *
 * @return { object } mountedWrapper, shallowWrapper
 */
const setup = () => {
  const mountedWrapper = mount(<Router><ConnectedUserProfileHeader {...props} store={store} /></Router>);
  const shallowWrapper = shallow(<PureProfileHeader {...props} />);
  return {
    mountedWrapper,
    shallowWrapper
  };
};

describe('<ProfileHeader', () => {
  it('renders ProfileHeader component without crashing ', () => {
    const { mountedWrapper } = setup();
    mountedWrapper.setState(state);
    expect(mountedWrapper).toBeDefined();
    expect(mountedWrapper.find('Link').length).toBe(1);
    expect(mountedWrapper.find('nav').length).toBe(1);
    expect(mountedWrapper.find('input').length).toBe(1);
    expect(mountedWrapper.exists()).toBe(true);
  });

  it('should match component snapshot', () => {
    const tree = render.create(<Router ><PureProfileHeader {...props} /></Router>);
    expect(tree).toMatchSnapshot();
  });

  it('calls handleChange event', () => {
    sinon.spy(PureProfileHeader.prototype, 'handleChange');
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    shallowWrapper.instance().handleChange(event);
    expect(PureProfileHeader.prototype.handleChange.calledOnce).toEqual(true);
  });

  it(' dispatches getRecipesBySearch action when search button is clicked', () => {
    sinon.spy(PureProfileHeader.prototype, 'handleSearch');
    const { shallowWrapper } = setup();
    shallowWrapper.instance().handleSearch(event);
    expect(PureProfileHeader.prototype.handleSearch.calledOnce).toEqual(true);
  });
});
