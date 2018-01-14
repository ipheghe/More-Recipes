import expect from 'expect';
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import render from 'react-test-renderer';
import ConnectedLandingPage, { Landing } from '../../../src/components/landing/Landing.jsx';
import mockItems from '../../__mocks__/mockItems';
import mockAuthCheck from '../../__mocks__/mockAuthCheck';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
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
};

/**
 *@description  setup function to mount component
 *
 * @return { * } null
 */
const setup = () => {
  const mountedWrapper = mount(<Router><ConnectedLandingPage {...props} store={store} /></Router>);
  const shallowWrapper = shallow(<Landing {...props} />);
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
    const { mountedWrapper } = setup();
    expect(mountedWrapper.find('LandingRecipeList').length).toBe(1);
    expect(mountedWrapper.exists()).toBe(true);
  });

  it('calls componentDidMount', () => {
    sinon.spy(Landing.prototype, 'componentDidMount');
    const { shallowWrapper } = setup();
    expect(shallowWrapper.exists()).toBe(true);
    expect(Landing.prototype.componentDidMount.calledOnce).toEqual(false);
  });

  it('calls showTopRecipes event ', () => {
    const { shallowWrapper } = setup();
    const event = {
      preventDefault: jest.fn()
    };
    shallowWrapper.instance().showTopRecipies(event);
  });

  it('should match component snapshot', () => {
    const tree = render.create(<Router ><Landing {...props} /></Router>);
    expect(tree).toMatchSnapshot();
  });
});
