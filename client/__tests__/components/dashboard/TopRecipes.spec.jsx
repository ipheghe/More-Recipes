import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import render from 'react-test-renderer';
import { HashRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedTopRecipes, { TopRecipes } from '../../../src/components/dashboard/TopRecipes.jsx';
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
    recipeList: mockItems.recipeArray,
    userRecipes: [],
    searchResult: []
  }
};

const store = mockStore(initialState);

const state = {
  recipes: mockItems.recipeArray,
  message: 'Sorry! You do not have any favorite recipe',
  pages: 2,
  currentPaginatePage: 1,
  isLoading: false
};

const props = {
  recipes: mockItems.recipeArray,
  pages: 2,
  getTopRecipes: jest.fn(() => Promise.resolve()),
};

const event = {
  preventDefault: jest.fn()
};

/**
 *@description  function to mount component
 *
 * @return { * } null
 */
const setup = () => {
  const mountedWrapper = mount(<Router><ConnectedTopRecipes {...props} store={store} /></Router>);
  const shallowWrapper = shallow(<TopRecipes {...props} />);
  return {
    mountedWrapper,
    shallowWrapper
  };
};

describe('<TopRecipes', () => {
  beforeEach(() => {
    mockAuthCheck();
  });

  it('should render a loader component before topRecipes component receives props', () => {
    props.recipes = [];
    const shallowWrapper = shallow(<TopRecipes {...props} />);
    shallowWrapper.setState({ recipes: [] });
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('Loader').length).toBe(1);
    expect(shallowWrapper.exists()).toBe(true);
  });

  it('renders without crashing', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('RecipeList').length).toBe(1);
    expect(shallowWrapper.find('Pagination').length).toBe(1);
    expect(shallowWrapper.exists()).toBe(true);
  });

  it('calls componentDidMount', () => {
    sinon.spy(TopRecipes.prototype, 'componentDidMount');
    const { shallowWrapper } = setup();
    expect(shallowWrapper.exists()).toBe(true);
    expect(TopRecipes.prototype.componentDidMount.calledOnce).toEqual(false);
  });

  it('calls componentWillReceiveProps if recipe from props is available', () => {
    sinon.spy(TopRecipes.prototype, 'componentWillReceiveProps');
    const { shallowWrapper } = setup();
    shallowWrapper.instance().componentWillReceiveProps(props);
    expect(TopRecipes.prototype.componentWillReceiveProps.calledOnce).toEqual(true);
  });

  it('should match component snapshot', () => {
    const tree = render.create(<Router ><TopRecipes {...props} /></Router>);
    expect(tree).toMatchSnapshot();
  });

  it('should display a message if recipe length is 0', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.setState({ recipes: [], isLoading: false });
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.exists()).toBe(true);
  });

  it('calls onPaginateClick event', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    const pages = state.currentPaginatePage;
    shallowWrapper.instance().onPaginateClick(pages);
    expect(shallowWrapper.state().currentPaginatePage).toEqual(1);
  });

  it('calls handleNext event after next button is clicked', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    shallowWrapper.instance().handleNext(event);
  });

  it('calls handleNext event after next button is clicked on the last page', () => {
    const { shallowWrapper } = setup();
    state.currentPaginatePage = 2;
    shallowWrapper.setState(state);
    shallowWrapper.instance().handleNext(event);
  });

  it('calls handlePrevious event after previous button is clicked', () => {
    const { shallowWrapper } = setup();
    state.currentPaginatePage = 2;
    shallowWrapper.setState(state);
    shallowWrapper.instance().handlePrevious(event);
  });

  it('calls handlePrevious event after previous button is clicked on the first page', () => {
    const { shallowWrapper } = setup();
    state.currentPaginatePage = 1;
    shallowWrapper.setState(state);
    shallowWrapper.instance().handlePrevious(event);
  });

  it(' dispatches getRecipes action', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    shallowWrapper.instance().getRecipes();
  });
});