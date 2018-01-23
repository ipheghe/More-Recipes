import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import render from 'react-test-renderer';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedSearch, { PureSearch }
  from '../../../src/components/Dashboard/Search';
import mockItems from '../../__mocks__/mockItems';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  recipe: {
    message: 'Sorry. No result found',
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
  message: 'Sorry. No result found',
  location: {
    search: 'spag',
    pathname: '/'
  },
  searchResult: mockItems.recipeArray
};

/**
 *@description  setup function to mount component
 *
 * @return { * } null
 */
const setup = () => {
  const mountedWrapper = mount(<Provider store={store}>
    <ConnectedSearch {...props} />
  </Provider>);
  const shallowWrapper = shallow(<PureSearch {...props} />);
  return {
    mountedWrapper,
    shallowWrapper
  };
};

describe('<Search', () => {
  it(`should render a loader component before 
     PureSearch component receives props`, () => {
      props.PureSearchResult = [];
      const shallowWrapper = shallow(<PureSearch {...props} />);
      expect(shallowWrapper).toBeDefined();
      expect(shallowWrapper.find('Loader').length).toBe(1);
      expect(shallowWrapper.exists()).toBe(true);
    });

  it('renders without crashing', () => {
    props.PureSearchResult = mockItems.recipeArray;
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('RecipeList').length).toBe(1);
    expect(shallowWrapper.exists()).toBe(true);
  });

  it('renders without crashing and displays search result message', () => {
    props.searchResult = [];
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('RecipeList').length).toBe(0);
    expect(shallowWrapper.find('Pagination').length).toBe(0);
    expect(shallowWrapper.instance().props.message)
      .toEqual('Sorry. No result found');
  });

  it(`calls componentWillReceiveProps 
     if message from props is available`, () => {
      sinon.spy(PureSearch.prototype, 'componentWillReceiveProps');
      const { shallowWrapper } = setup();
      shallowWrapper.instance().componentWillReceiveProps(props);
      expect(PureSearch.prototype.componentWillReceiveProps.calledOnce)
        .toEqual(true);
      expect(shallowWrapper.instance().props.message)
        .toEqual('Sorry. No result found');
    });

  it(`doesnt call componentWillReceiveProps 
     if message from props is unavailable`, () => {
      props.message = null;
      const { shallowWrapper } = setup();
      shallowWrapper.instance().componentWillReceiveProps(props);
      expect(shallowWrapper.instance().props.message)
        .toEqual(null);
    });

  it('should match component snapshot', () => {
    const tree = render.create(<PureSearch {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('calls onPaginateClick event', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    const data = { selected: 2 };
    shallowWrapper.instance().onPaginateClick(data);
    expect(shallowWrapper.state().currentPaginatePage).toEqual(3);
  });

  it('dispatches getRecipes action', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    shallowWrapper.instance().getRecipes();
  });
});
