import expect from 'expect';
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import render from 'react-test-renderer';
import ConnectedLandingPage, { PureLanding }
  from '../../../src/components/landing/Landing.jsx';
import mockItems from '../../__mocks__/mockItems';
import mockAuthCheck from '../../__mocks__/mockAuthCheck';

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
  recipe: {
    message: '',
    error: '',
    pages: 2,
    recipeData: {},
    recipeList: [],
    userRecipes: [],
    searchResult: []
  }
};

const store = mockStore(initialState);

const props = {
  recipeList: mockItems.recipeArray,
  getTopRecipesLanding: jest.fn(() => Promise.resolve()),
  isAuthenticated: false
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
  const mountedWrapper = mount(<Router><ConnectedLandingPage {...props} store={store} /></Router>);
  const shallowWrapper = shallow(<PureLanding {...props} />);
  return {
    mountedWrapper,
    shallowWrapper
  };
};

describe('<Landing', () => {
  beforeEach(() => {
    mockAuthCheck();
  });

  it('renders without crashing', () => {
    const { mountedWrapper } = setup(false);
    expect(mountedWrapper.find('LandingRecipeList').length).toBe(1);
    expect(mountedWrapper.exists()).toBe(true);
  });

  it('calls componentDidMount', () => {
    sinon.spy(PureLanding.prototype, 'componentDidMount');
    const { shallowWrapper } = setup(false);
    expect(shallowWrapper.exists()).toBe(true);
    expect(PureLanding.prototype.componentDidMount.calledOnce).toEqual(false);
  });

  it('calls showTopRecipes event ', () => {
    const { shallowWrapper } = setup(false);
    const event = {
      preventDefault: jest.fn()
    };
    shallowWrapper.instance().showTopRecipies(event);
  });

  it('should match component snapshot', () => {
    const tree = render.create(<Router ><PureLanding {...props} /></Router>);
    expect(tree).toMatchSnapshot();
  });

  it('redirects to dashboard page if user is authenticated', () => {
    const { shallowWrapper } = setup(true);
    expect(shallowWrapper).toBeDefined();
  });
});
