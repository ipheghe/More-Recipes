import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import render from 'react-test-renderer';
import { HashRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedManageRecipe, { PureManageRecipe }
  from '../../../../src/components/dashboard/manageRecipe/ManageRecipe.jsx';
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
  const mountedWrapper = mount(<Router><ConnectedManageRecipe {...props} store={store} /></Router>);
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

  it('calls componentWillReceiveProps if component receives new props for imageUrl', () => {
    sinon.spy(PureManageRecipe.prototype, 'componentWillReceiveProps');
    const { shallowWrapper } = setup();
    shallowWrapper.instance().componentWillReceiveProps(props);
    expect(PureManageRecipe.prototype.componentWillReceiveProps.calledOnce).toEqual(true);
  });

  it('checks new props for imageUrl through componentWillReceiveProps method but finds none', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.instance().componentWillReceiveProps(!nextProps);
    expect(PureManageRecipe.prototype.componentWillReceiveProps.calledOnce).toEqual(false);
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
    expect(PureManageRecipe.prototype.handleImageChange.calledOnce).toEqual(true);
  });

  it('calls handleLoadRecipe event after add recipe button is clicked', () => {
    sinon.spy(PureManageRecipe.prototype, 'handleLoadRecipe');
    const { shallowWrapper } = setup();
    shallowWrapper.instance().handleLoadRecipe(1);
    expect(PureManageRecipe.prototype.handleLoadRecipe.calledOnce).toEqual(true);
  });

  it('calls handleLoadRecipe event after add recipe button is clicked', () => {
    const { shallowWrapper } = setup();
    const recipeId = null;
    shallowWrapper.instance().handleLoadRecipe(recipeId);
    expect(PureManageRecipe.prototype.handleLoadRecipe.calledOnce).toEqual(false);
  });

  it('dispatches handleUpdateRecipe action after validatiing fields', () => {
    sinon.spy(PureManageRecipe.prototype, 'handleUpdateRecipe');
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    const recipeId = { value: 1 };
    shallowWrapper.instance().recipeId = recipeId;
    shallowWrapper.instance().handleUpdateRecipe(event);
    expect(PureManageRecipe.prototype.handleUpdateRecipe.calledOnce).toEqual(true);
  });

  it('calls validateFormField method with null recipeName field', () => {
    sinon.spy(PureManageRecipe.prototype, 'validateFormField');
    const { shallowWrapper } = setup();
    state.recipeDetail = '';
    const recipeId = { value: 1 };
    shallowWrapper.instance().recipeId = recipeId;
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    jest.runAllTimers();
    expect(PureManageRecipe.prototype.validateFormField.calledOnce)
      .toEqual(true);
    expect(shallowWrapper.state().recipeDetail).toEqual('');
  });


  it('calls validateFormField method with null recipeName field', () => {
    const { shallowWrapper } = setup();
    state.imageUrl = '';
    const recipeId = { value: 1 };
    shallowWrapper.instance().recipeId = recipeId;
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    jest.runAllTimers();
    expect(PureManageRecipe.prototype.validateFormField.calledOnce)
      .toEqual(false);
    expect(shallowWrapper.state().imageUrl).toEqual('');
  });


  it('calls validateFormField method with null recipeName field', () => {
    const { shallowWrapper } = setup();
    state.ingredients = '';
    const recipeId = { value: 1 };
    shallowWrapper.instance().recipeId = recipeId;
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    jest.runAllTimers();
    expect(PureManageRecipe.prototype.validateFormField.calledOnce)
      .toEqual(false);
    expect(shallowWrapper.state().ingredients).toEqual('');
  });


  it('calls validateFormField method with null recipeName field', () => {
    const { shallowWrapper } = setup();
    state.ingredients = 'nnbjk';
    state.directions = '';
    const recipeId = { value: 1 };
    shallowWrapper.instance().recipeId = recipeId;
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    jest.runAllTimers();
    expect(PureManageRecipe.prototype.validateFormField.calledOnce)
      .toEqual(false);
    expect(shallowWrapper.state().directions).toEqual('');
    expect(shallowWrapper.state().hasErrored).toEqual(false);
  });

  it('calls validateFormField method with null recipeName field', () => {
    const { shallowWrapper } = setup();
    const recipeId = { value: null };
    shallowWrapper.instance().recipeId = recipeId;
    state.directions = 'hjknjk';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    jest.runAllTimers();
    expect(PureManageRecipe.prototype.validateFormField.calledOnce)
      .toEqual(false);
  });

  it('dispatches handleDeleteRecipe action after validatiing fields', () => {
    sinon.spy(PureManageRecipe.prototype, 'handleDeleteRecipe');
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    const recipeId = { value: 1 };
    shallowWrapper.instance().recipeId = recipeId;
    shallowWrapper.instance().handleDeleteRecipe(event);
    expect(PureManageRecipe.prototype.handleDeleteRecipe.calledOnce).toEqual(true);
  });

  it('dispatches handleDeleteRecipe action after validatiing fields', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    const recipeId = { value: null };
    shallowWrapper.instance().recipeId = recipeId;
    shallowWrapper.instance().handleDeleteRecipe(event);
    jest.runAllTimers();
    expect(PureManageRecipe.prototype.handleDeleteRecipe.calledOnce).toEqual(false);
  });

  it('dispatches handleDeleteRecipe action after validatiing fields', () => {
    const { shallowWrapper } = setup();
    state.recipes = [];
    shallowWrapper.setState(state);
    const recipeId = { value: 1 };
    shallowWrapper.instance().recipeId = recipeId;
    expect(PureManageRecipe.prototype.handleDeleteRecipe.calledOnce).toEqual(false);
  });

  // it('calls validateFormField method with null ingredients field', () => {
  //   const { shallowWrapper } = setup();
  //   state.recipeName = 'Banga Rice';
  //   state.ingredients = '';
  //   shallowWrapper.setState(state);
  //   shallowWrapper.instance().validateFormField();
  //   jest.runAllTimers();
  //   expect(PureAddRecipe.prototype.validateFormField.calledOnce).toEqual(false);
  //   expect(shallowWrapper.state().ingredients).toEqual('');
  // });

  // it('calls validateFormField method with null description field', () => {
  //   const { shallowWrapper } = setup();
  //   state.ingredients = 'Rice,meat';
  //   state.description = '';
  //   shallowWrapper.setState(state);
  //   shallowWrapper.instance().validateFormField();
  //   jest.runAllTimers();
  //   expect(PureAddRecipe.prototype.validateFormField.calledOnce).toEqual(false);
  //   expect(shallowWrapper.state().description).toEqual('');
  // });

  // it('calls validateFormField method with null image url field', () => {
  //   const { shallowWrapper } = setup();
  //   state.description = 'Boil Rice, boil meat';
  //   state.imageUrl = '';
  //   shallowWrapper.setState(state);
  //   shallowWrapper.instance().validateFormField();
  //   jest.runAllTimers();
  //   expect(PureAddRecipe.prototype.validateFormField.calledOnce).toEqual(false);
  //   expect(shallowWrapper.state().imageUrl).toEqual('');
  // });
});
