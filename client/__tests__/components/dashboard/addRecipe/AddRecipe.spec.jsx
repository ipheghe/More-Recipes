import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import render from 'react-test-renderer';
import { HashRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedAddRecipe, { AddRecipe } from '../../../../src/components/dashboard/addRecipe/AddRecipe.jsx';

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
  recipeName: 'Jollof Rice',
  recipeDetail: 'Sweet and Delicious',
  ingredients: 'rice, maggi, tomato',
  directions: 'boil rice, fry stew',
  imageUrl: '/assets/image/pizza1.jpg',
  hasErrored: false,
  errorMessage: ''
};

const props = {
  addRecipe: jest.fn(() => Promise.resolve()),
  uploadImage: jest.fn(() => Promise.resolve()),
  errorMessage: '',
  imageFile: '/assets/images/pizza.jpg',
  imageUrl: '/assets/images/pizza.jpg'

};

const nextProps = {
  addRecipe: jest.fn(() => Promise.resolve()),
  uploadImage: jest.fn(() => Promise.resolve()),
  errorMessage: ''
};

const event = {
  preventDefault: jest.fn(),
  target: {
    recipeName: 'Jollof Rice',
    recipeDetail: 'Sweet and Delicious',
    ingredients: 'rice, maggi, tomato',
    directions: 'boil rice, fry stew',
    imageUrl: '/assets/image/pizza1.jpg',
    files: ['/assets/image/pizza1.jpg']
  }
};

/**
 * @description function to mount component
 *
 * @return { * } null
 */
const setup = () => {
  const mountedWrapper = mount(<Router><ConnectedAddRecipe {...props} store={store} /></Router>);
  const shallowWrapper = shallow(<AddRecipe {...props} />);
  return {
    mountedWrapper,
    shallowWrapper
  };
};

describe('<AddRecipe', () => {
  it('renders without crashing', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.setState(state);
    expect(shallowWrapper).toBeDefined();
    expect(shallowWrapper.find('AddRecipeForm').length).toBe(1);
    expect(shallowWrapper.find('div').length).toBe(2);
    expect(shallowWrapper.exists()).toBe(true);
  });

  it('should match component snapshot', () => {
    const tree = render.create(<Router ><AddRecipe {...props} /></Router>);
    expect(tree).toMatchSnapshot();
  });

  it('calls componentWillReceiveProps if component receives new props for imageUrl', () => {
    sinon.spy(AddRecipe.prototype, 'componentWillReceiveProps');
    const { shallowWrapper } = setup();
    shallowWrapper.instance().componentWillReceiveProps(props);
    expect(AddRecipe.prototype.componentWillReceiveProps.calledOnce).toEqual(true);
  });

  it('checks new props for imageUrl through componentWillReceiveProps method but finds none', () => {
    const { shallowWrapper } = setup();
    shallowWrapper.instance().componentWillReceiveProps(nextProps);
    expect(AddRecipe.prototype.componentWillReceiveProps.calledOnce).toEqual(false);
  });

  it('calls handleChange event', () => {
    sinon.spy(AddRecipe.prototype, 'handleChange');
    const { shallowWrapper } = setup();
    shallowWrapper.instance().handleChange(event);
    expect(AddRecipe.prototype.handleChange.calledOnce).toEqual(true);
  });

  it('calls handleImageChange event', () => {
    sinon.spy(AddRecipe.prototype, 'handleImageChange');
    const { shallowWrapper } = setup();
    shallowWrapper.instance().handleImageChange(event);
    expect(AddRecipe.prototype.handleImageChange.calledOnce).toEqual(true);
  });

  it('calls handleAddRecipe event after add recipe button is clicked', () => {
    sinon.spy(AddRecipe.prototype, 'handleAddRecipe');
    const { shallowWrapper } = setup();
    shallowWrapper.instance().handleAddRecipe(event);
    expect(AddRecipe.prototype.handleAddRecipe.calledOnce).toEqual(true);
  });

  it('calls validateFormField method with null recipeName field', () => {
    sinon.spy(AddRecipe.prototype, 'validateFormField');
    const { shallowWrapper } = setup();
    state.recipeName = '';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(AddRecipe.prototype.validateFormField.calledOnce).toEqual(true);
    expect(shallowWrapper.state().recipeName).toEqual('');
  });

  it('dispatches addRecipe action after validatiing fields', () => {
    const { shallowWrapper } = setup();
    state.recipeName = 'Jollof Rice';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(AddRecipe.prototype.validateFormField.calledOnce).toEqual(false);
    expect(shallowWrapper.state().recipeName).toEqual('Jollof Rice');
  });
});
