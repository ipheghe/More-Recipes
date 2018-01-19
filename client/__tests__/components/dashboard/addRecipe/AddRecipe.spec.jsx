import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import render from 'react-test-renderer';
import { HashRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedAddRecipe, { PureAddRecipe }
  from '../../../../src/components/dashboard/addRecipe/AddRecipe.jsx';

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
  PureAddRecipe: jest.fn(() => Promise.resolve()),
  uploadImage: jest.fn(() => Promise.resolve()),
  errorMessage: '',
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

jest.useFakeTimers();

/**
 * @description function to mount component
 *
 * @return { * } null
 */
const setup = () => {
  const mountedWrapper = mount(<Router>
    <ConnectedAddRecipe {...props} store={store} />
  </Router>);
  const shallowWrapper = shallow(<PureAddRecipe {...props} />);
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
    const tree = render.create(<Router ><PureAddRecipe {...props} /></Router>);
    expect(tree).toMatchSnapshot();
  });

  it(`calls componentWillReceiveProps
      if component receives new props for imageUrl`, () => {
      sinon.spy(PureAddRecipe.prototype, 'componentWillReceiveProps');
      const { shallowWrapper } = setup();
      shallowWrapper.instance().componentWillReceiveProps(props);
      expect(PureAddRecipe.prototype.componentWillReceiveProps.calledOnce)
        .toEqual(true);
      expect(shallowWrapper.instance().props.imageUrl)
        .toEqual('/assets/images/pizza.jpg');
    });

  it(`checks new props for imageUrl through
      componentWillReceiveProps method but finds none`, () => {
      const { shallowWrapper } = setup();
      shallowWrapper.instance().componentWillReceiveProps(nextProps);
      expect(PureAddRecipe.prototype.componentWillReceiveProps.calledOnce)
        .toEqual(false);
    });

  it('calls handleChange event', () => {
    sinon.spy(PureAddRecipe.prototype, 'handleChange');
    const { shallowWrapper } = setup();
    shallowWrapper.instance().handleChange(event);
    expect(PureAddRecipe.prototype.handleChange.calledOnce).toEqual(true);
  });

  it('calls handleImageChange event', () => {
    sinon.spy(PureAddRecipe.prototype, 'handleImageChange');
    const { shallowWrapper } = setup();
    shallowWrapper.instance().handleImageChange(event);
    expect(PureAddRecipe.prototype.handleImageChange.calledOnce).toEqual(true);
  });

  it('calls handleAddRecipe event after add recipe button is clicked', () => {
    sinon.spy(PureAddRecipe.prototype, 'handleAddRecipe');
    const { shallowWrapper } = setup();
    shallowWrapper.instance().handleAddRecipe(event);
    expect(PureAddRecipe.prototype.handleAddRecipe.calledOnce).toEqual(true);
  });

  it('displays error message if user enters a null recipe name field', () => {
    sinon.spy(PureAddRecipe.prototype, 'validateFormField');
    const { shallowWrapper } = setup();
    state.recipeName = '';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(shallowWrapper.state().hasErrored).toEqual(true);
    expect(shallowWrapper.state().errorMessage)
      .toEqual('Recipe name field cannot be empty');
    jest.runAllTimers();
    expect(shallowWrapper.state().errorMessage).toEqual('');
  });

  it('displays error message if user enters a null ingredients field', () => {
    const { shallowWrapper } = setup();
    state.recipeName = 'Banga Rice';
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
    state.ingredients = 'Rice,meat';
    state.directions = '';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(shallowWrapper.state().hasErrored).toEqual(true);
    expect(shallowWrapper.state().errorMessage)
      .toEqual('directions field cannot be empty');
    jest.runAllTimers();
    expect(shallowWrapper.state().errorMessage).toEqual('');
  });

  it('displays error message if user enters a null imageUrl field', () => {
    const { shallowWrapper } = setup();
    state.directions = 'Boil Rice, boil meat';
    state.imageUrl = '';
    shallowWrapper.setState(state);
    shallowWrapper.instance().validateFormField();
    expect(shallowWrapper.state().hasErrored).toEqual(true);
    expect(shallowWrapper.state().errorMessage)
      .toEqual('Recipe image field cannot be empty');
    jest.runAllTimers();
    expect(shallowWrapper.state().errorMessage).toEqual('');
  });

  it(`dispatches AddRecipe action after
      validatiing form fields successfully`, () => {
      const { shallowWrapper } = setup();
      state.imageUrl = '/assets/image/pizza1.jpg';
      shallowWrapper.setState(state);
      shallowWrapper.instance().validateFormField();
      expect(PureAddRecipe.prototype.validateFormField.calledOnce)
        .toEqual(false);
      expect(shallowWrapper.state().recipeName).toEqual('Banga Rice');
    });
});
