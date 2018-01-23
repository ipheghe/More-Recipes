import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import render from 'react-test-renderer';
import { HashRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedManageRecipe, { PureManageRecipe }
  from '../../../../src/components/Dashboard/ManageRecipe';
import mockItems from '../../../__mocks__/mockItems';
import mockAuthCheck from '../../../__mocks__/mockAuthCheck';

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
    recipeData: mockItems.recipe,
    recipeList: [],
    userRecipes: [],
    searchResult: []
  },
  imageUploadReducer: [{
    imageData: {},
    response: '/assets/images/pizza.jpg',
    error: '',
    isloaded: false
  }]
};

const store = mockStore(initialState);

const state = {
  recipes: mockItems.recipeArray,
  recipeId: null,
  recipeDetail: 'Sweet and Delicious',
  ingredients: 'rice, maggi, tomato',
  directions: 'boil rice, fry stew',
  imageUrl: '/assets/image/pizza1.jpg',
  hasErrored: false,
  errorMessage: '',
  isLoading: false
};

const props = {
  updateRecipe: jest.fn(() => Promise.resolve()),
  uploadImage: jest.fn(() => Promise.resolve()),
  deleteRecipe: jest.fn(() => Promise.resolve()),
  getUserRecipes: jest.fn(() => Promise.resolve()),
  getRecipe: jest.fn(() => Promise.resolve()),
  errorMessage: '',
  imageFile: '/assets/images/pizza.jpg',
  imageUrl: '/assets/images/pizza.jpg',
  userRecipes: mockItems.recipeArray,
  recipe: mockItems.recipe,
};

const nextProps = {
  recipeData: mockItems.recipe,
  userRecipes: mockItems.recipeArray,
};

const event = {
  preventDefault: jest.fn(),
  target: {
    recipeDetail: 'Sweet and Delicious',
    ingredients: 'rice, maggi, tomato',
    directions: 'boil rice, fry stew',
    imageUrl: '/assets/image/pizza1.jpg',
    files: ['/assets/image/pizza1.jpg']
  }
};

jest.useFakeTimers();

/**
 * @description function to mount component
 *
 * @return { * } null
 */
const setup = () => {
  const mountedWrapper
  = mount(<Router><ConnectedManageRecipe {...props} store={store} /></Router>);
  const shallowWrapper = shallow(<PureManageRecipe {...props} />);
  return {
    mountedWrapper,
    shallowWrapper
  };
};

describe('<ManageRecipe', () => {
  beforeEach(() => {
    mockAuthCheck();
  });

  it('renders without crashing', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('ManageRecipeForm').length).toBe(1);
    expect(shallowWrapper.find('div').length).toBe(2);
    expect(shallowWrapper.exists()).toBe(true);
  });

  it('should match component snapshot', () => {
    const tree = render.create(<PureManageRecipe {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it(`calls componentWillReceiveProps if
      component receives new props for imageUrl`, () => {
      sinon.spy(PureManageRecipe.prototype, 'componentWillReceiveProps');
      const { shallowWrapper } = setup();
      shallowWrapper.instance().componentWillReceiveProps(props);
      expect(PureManageRecipe.prototype.componentWillReceiveProps.calledOnce)
        .toEqual(true);
    });

  it(`checks new props for imageUrl through
      componentWillReceiveProps method but finds none`, () => {
      const { shallowWrapper } = setup();
      shallowWrapper.instance().componentWillReceiveProps(!nextProps);
      expect(PureManageRecipe.prototype.componentWillReceiveProps.calledOnce)
        .toEqual(false);
    });

  it('calls handleChange event', () => {
    sinon.spy(PureManageRecipe.prototype, 'handleChange');
    const { shallowWrapper } = setup();
    shallowWrapper.instance().handleChange(event);
    expect(PureManageRecipe.prototype.handleChange.calledOnce).toEqual(true);
  });

  it('calls handleImageChange event', () => {
    sinon.spy(PureManageRecipe.prototype, 'handleImageChange');
    const { shallowWrapper } = setup();
    shallowWrapper.instance().handleImageChange(event);
    expect(PureManageRecipe.prototype.handleImageChange.calledOnce)
      .toEqual(true);
  });

  it('calls handleLoadRecipe event after add recipe button is clicked', () => {
    sinon.spy(PureManageRecipe.prototype, 'handleLoadRecipe');
    const { shallowWrapper } = setup();
    shallowWrapper.instance().handleLoadRecipe(1);
    expect(PureManageRecipe.prototype.handleLoadRecipe.calledOnce)
      .toEqual(true);
  });

  it('calls handleLoadRecipe event after add recipe button is clicked', () => {
    const { shallowWrapper } = setup();
    const recipeId = null;
    shallowWrapper.instance().handleLoadRecipe(recipeId);
    expect(PureManageRecipe.prototype.handleLoadRecipe.calledOnce)
      .toEqual(false);
  });

  it('displays error message if user enters a null ingredients field', () => {
    const { shallowWrapper } = setup();
    state.ingredients = '';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(shallowWrapper.state().hasErrored).toEqual(true);
    expect(shallowWrapper.state().errorMessage)
      .toEqual('ingredients field cannot be empty');
    jest.runAllTimers();
    expect(shallowWrapper.state().errorMessage).toEqual('');
  });


  it('displays error message if user enters a null directions field', () => {
    const { shallowWrapper } = setup();
    state.ingredients = 'nnbjk';
    state.directions = '';
    const recipeId = { value: 1 };
    shallowWrapper.instance().recipeId = recipeId;
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(shallowWrapper.state().hasErrored).toEqual(true);
    expect(shallowWrapper.state().errorMessage)
      .toEqual('directions field cannot be empty');
    jest.runAllTimers();
    expect(shallowWrapper.state().errorMessage).toEqual('');
  });

  it('displays error message if recipeId is null', () => {
    const { shallowWrapper } = setup();
    const recipeId = { value: null };
    shallowWrapper.instance().recipeId = recipeId;
    state.directions = 'hjknjk';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(shallowWrapper.state().hasErrored).toEqual(true);
    expect(shallowWrapper.state().errorMessage)
      .toEqual('Please select a recipe');
    jest.runAllTimers();
    expect(shallowWrapper.state().errorMessage).toEqual('');
  });

  it(`dispatches handleUpdateRecipe action
     after validatiing form fields successfully`, () => {
      sinon.spy(PureManageRecipe.prototype, 'handleUpdateRecipe');
      const { shallowWrapper } = setup();
      state.directions = 'hjknjk';
      state.recipeId = '1';
      shallowWrapper.setState(state);
      shallowWrapper.instance().handleUpdateRecipe(event);
      expect(PureManageRecipe.prototype.handleUpdateRecipe.calledOnce)
        .toEqual(true);
    });

  it(`displays error when dispatching handleDeleteRecipe
    action with a null recipeId value`, () => {
      sinon.spy(PureManageRecipe.prototype, 'handleDeleteRecipe');
      const { shallowWrapper } = setup();
      state.recipeId = null;
      shallowWrapper.setState(state);
      shallowWrapper.instance().handleDeleteRecipe(event);
      jest.runAllTimers();
      expect(PureManageRecipe.prototype.handleDeleteRecipe.calledOnce)
        .toEqual(true);
    });

  it(`dispatches handleDeleteRecipe action
      after validatiing form fields successfully`, () => {
      const { shallowWrapper } = setup();
      state.recipeId = '1';
      shallowWrapper.setState(state);
      const recipeId = { value: 1 };
      shallowWrapper.instance().recipeId = recipeId;
      shallowWrapper.instance().handleDeleteRecipe(event);
      expect(PureManageRecipe.prototype.handleDeleteRecipe.calledOnce)
        .toEqual(false);
    });
});
