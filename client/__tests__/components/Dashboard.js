import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import {
  Switch,
  HashRouter as Router, hashHistory
} from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { Dashboard } from '../../src/components';
import mockItems from '../__mocks__/mockItems';
import mockAuthCheck from '../__mocks__/mockAuthCheck';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  recipe: {
    message: '',
    error: '',
    pages: 1,
    recipeData: {},
    recipeList: mockItems.recipeArray,
    userRecipes: [],
    searchResult: []
  }
};

const store = mockStore(initialState);

/**
 *
 * @return { * } null
 */
const setup = () => {
  mockAuthCheck();
  const props = {
    getTopRecipes: jest.fn(),
    recipes: mockItems.recipeArray,
    pages: 1
  };
  const wrapper = mount(<Router history={hashHistory}><Switch><Dashboard {...props} store={store} /></Switch></Router>);
  return {
    wrapper
  };
};


describe('<Dashboard', () => {
  it('renders without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });
});
