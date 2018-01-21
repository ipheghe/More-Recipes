import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import render from 'react-test-renderer';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedViewRecipe, { PureViewRecipe }
  from '../../../src/components/viewRecipe/ViewRecipe.jsx';
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
  recipe: {
    message: '',
    error: '',
    pages: 2,
    recipeData: mockItems.recipe,
    recipeList: mockItems.recipeArray,
    userRecipes: [],
    searchResult: []
  },
  category: {
    error: '',
    message: '',
    categoryList: [mockItems.category],
    userCategoryList: [mockItems.category]
  },
  review: {
    message: '',
    error: '',
    count: 1,
    reviewList: [mockItems.review]
  },
  favorite: {
    message: '',
    status: false,
    error: '',
    pages: 1,
    userFavorites: mockItems.recipeArray,
    userFavorite: [],
  },
  vote: {
    message: '',
    error: '',
    upvote: 1,
    downvote: 0
  }
};

const store = mockStore(initialState);

const state = {
  recipe: mockItems.recipeArray,
  reviews: [mockItems.review],
  ingredients: ['rice', 'maggi', 'tomato'],
  directions: ['boil rice', 'fry stew'],
  reviewMessage: 'nice meal',
  isFavorite: false,
  isLoading: false,
  upVoteState: true,
  downVoteState: true,
  modalIsOpen: false
};

const props = {
  count: 1,
  viewRecipe: jest.fn(() => Promise.resolve()),
  postReview: jest.fn(() => Promise.resolve()),
  getReviews: jest.fn(() => Promise.resolve()),
  upvoteRecipe: jest.fn(() => Promise.resolve()),
  downvoteRecipe: jest.fn(() => Promise.resolve()),
  favoriteRecipe: jest.fn(() => Promise.resolve()),
  unfavoriteRecipe: jest.fn(() => Promise.resolve()),
  getFavoriteRecipe: jest.fn(() => Promise.resolve()),
  match: {
    params: {
      id: '2'
    }
  },
  categories: [mockItems.category],
  recipe: mockItems.recipe,
  reviews: [mockItems.review],
  upvote: 1,
  downvote: 2,
  userData: mockItems.user,
  status: 'Fail'
};

const nextprops = {
  recipe: mockItems.recipe,
  reviews: [mockItems.review],
};

const event = {
  preventDefault: jest.fn(),
  target: {
    reviewMessage: 'nice meal'
  }
};

/**
 *@description  function to mount component
 *
 * @return { * } null
 */
const setup = () => {
  const mountedWrapper =
  mount(<Provider store={store}><ConnectedViewRecipe {...props} /></Provider>);
  const shallowWrapper = shallow(<PureViewRecipe {...props} />);
  return {
    mountedWrapper,
    shallowWrapper
  };
};

describe('<ViewRecipe', () => {
  beforeEach(() => {
    mockAuthCheck();
  });

  it('should render a loader component before ' +
  'ViewRecipe component receives props', () => {
    props.recipe = {};
    const shallowWrapper = shallow(<PureViewRecipe {...props} />);
    shallowWrapper.setState({ recipes: [] });
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('Loader').length).toBe(1);
    expect(shallowWrapper.exists()).toBe(true);
  });

  it('renders without crashing', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('ReviewBox').length).toBe(1);
    expect(shallowWrapper.exists()).toBe(true);
  });

  it('calls componentWillReceiveProps if all ' +
  'needed props are available', () => {
    sinon.spy(PureViewRecipe.prototype, 'componentWillReceiveProps');
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    shallowWrapper.instance().componentWillReceiveProps(nextprops);
    expect(PureViewRecipe.prototype.componentWillReceiveProps.calledOnce)
      .toEqual(true);
  });

  it('does not call componentWillReceiveProps if all ' +
  'needed props are not available', () => {
    props.recipe = null;
    const shallowWrapper = shallow(<PureViewRecipe {...props} />);
    shallowWrapper.instance().componentWillReceiveProps(props);
    expect(PureViewRecipe.prototype.componentWillReceiveProps.calledOnce)
      .toEqual(false);
  });

  it('should match component snapshot', () => {
    const tree = render.create(<PureViewRecipe {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should show unfavorite button ', () => {
    const { shallowWrapper } = setup();
    state.isFavorite = true;
    shallowWrapper.setState(state);
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('button#un-favorite').length).toBe(1);
    expect(shallowWrapper.exists()).toBe(true);
  });

  it('should show a default image if image url from recipe is null', () => {
    const { shallowWrapper } = setup();
    state.recipe.imageUrl = null;
    shallowWrapper.setState(state);
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.exists()).toBe(true);
  });

  it('calls handleChange event', () => {
    sinon.spy(PureViewRecipe.prototype, 'handleChange');
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().handleChange(event);
    expect(PureViewRecipe.prototype.handleChange.calledOnce).toEqual(true);
  });

  it('dispatches postReview action', () => {
    sinon.spy(PureViewRecipe.prototype, 'handlePostReview');
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    shallowWrapper.instance().handlePostReview(event);
    expect(PureViewRecipe.prototype.handleChange.calledOnce).toEqual(true);
  });


  it('dispatches upvote recipe action', () => {
    sinon.spy(PureViewRecipe.prototype, 'handleUpvote');
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    shallowWrapper.instance().handleUpvote(event);
    expect(PureViewRecipe.prototype.handleUpvote.calledOnce)
      .toEqual(true);
  });

  it('dispatches downvote recipe action', () => {
    sinon.spy(PureViewRecipe.prototype, 'handleDownvote');
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    shallowWrapper.instance().handleDownvote(event);
    expect(PureViewRecipe.prototype.handleDownvote.calledOnce)
      .toEqual(true);
  });

  it('dispatches favorite recipe action', () => {
    sinon.spy(PureViewRecipe.prototype, 'handleFavoriteRecipe');
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    const categoryInput = { value: 1 };
    shallowWrapper.instance().categoryInput = categoryInput;
    shallowWrapper.instance().handleFavoriteRecipe(event);
    expect(PureViewRecipe.prototype.handleFavoriteRecipe.calledOnce)
      .toEqual(true);
  });

  it('dispatches unfavorite recipe action', () => {
    sinon.spy(PureViewRecipe.prototype, 'handleUnfavoriteRecipe');
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    shallowWrapper.instance().handleUnfavoriteRecipe(event);
    expect(PureViewRecipe.prototype.handleUnfavoriteRecipe.calledOnce)
      .toEqual(true);
  });

  it('calls openModal event when favorite button is clicked', () => {
    sinon.spy(PureViewRecipe.prototype, 'openModal');
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().openModal(event);
    expect(PureViewRecipe.prototype.openModal.calledOnce)
      .toEqual(true);
  });

  it('calls closeModal event', () => {
    sinon.spy(PureViewRecipe.prototype, 'closeModal');
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().closeModal(event);
    expect(PureViewRecipe.prototype.closeModal.calledOnce).toEqual(true);
  });

  it('dispatches get reviews action', () => {
    sinon.spy(PureViewRecipe.prototype, 'loadMore');
    const { shallowWrapper } = setup(false);
    shallowWrapper.instance().loadMore(event);
    expect(PureViewRecipe.prototype.loadMore.calledOnce).toEqual(true);
  });

  it('shows load more button if number of ' +
  'reviews is less than page count', () => {
    const { shallowWrapper } = setup(false);
    state.reviews = [];
    shallowWrapper.setState(state);
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.exists()).toBe(true);
  });
});
