import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import render from 'react-test-renderer';
import { HashRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedSearch, { Search } from '../../../src/components/dashboard/Search.jsx';
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
  pages: 1,
  currentPaginatePage: 1,
  isLoading: false
};

const props = {
  getRecipesBySearch: jest.fn(() => Promise.resolve()),
  message: '',
  location: {
    search: '',
    pathname: '/'
  },
  searchResult: mockItems.recipeArray
};

const event = {
  preventDefault: jest.fn()
};

/**
 *@description  setup function to mount component
 *
 * @return { * } null
 */
const setup = () => {
  const mountedWrapper = mount(<Provider store={store}><ConnectedSearch {...props} /></Provider>);
  const shallowWrapper = shallow(<Search {...props} />);
  return {
    mountedWrapper,
    shallowWrapper
  };
};

describe('<Search', () => {
  it('should render a loader component before Search component receives props', () => {
    props.searchResult = [];
    const shallowWrapper = shallow(<Search {...props} />);
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('Loader').length).toBe(1);
    expect(shallowWrapper.exists()).toBe(true);
  });

  it('renders without crashing', () => {
    props.searchResult = mockItems.recipeArray;
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('RecipeList').length).toBe(1);
    expect(shallowWrapper.find('Pagination').length).toBe(1);
    expect(shallowWrapper.exists()).toBe(true);
  });

  it('renders without crashing and displays search result message', () => {
    props.searchResult = [];
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('RecipeList').length).toBe(0);
    expect(shallowWrapper.find('Pagination').length).toBe(0);
    expect(shallowWrapper.exists()).toBe(true);
  });

  it('calls componentWillReceiveProps if message from props is available', () => {
    sinon.spy(Search.prototype, 'componentWillReceiveProps');
    const { shallowWrapper } = setup();
    shallowWrapper.instance().componentWillReceiveProps(props);
    expect(Search.prototype.componentWillReceiveProps.calledOnce).toEqual(true);
  });

  it('doesnt call componentWillReceiveProps if message from props is unavailable', () => {
    props.message = null;
    const { shallowWrapper } = setup();
    shallowWrapper.instance().componentWillReceiveProps(props);
    expect(Search.prototype.componentWillReceiveProps.calledOnce).toEqual(false);
  });

  it('should match component snapshot', () => {
    const tree = render.create(<Search {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('calls onPaginateClick event', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    const pages = state.currentPaginatePage;
    shallowWrapper.instance().onPaginateClick(pages);
    expect(shallowWrapper.state().currentPaginatePage).toEqual(1);
  });

  it('calls handleNext event after next button is clicked', () => {
    sinon.spy(Search.prototype, 'URLSearchParams');
    const { shallowWrapper } = setup();
    const URLSearchParams = jest.fn();
    shallowWrapper.instance().URLSearchParams();
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

  it('dispatches getRecipes action', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    shallowWrapper.instance().getRecipes();
  });
});
