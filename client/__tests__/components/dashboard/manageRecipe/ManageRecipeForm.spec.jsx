import expect from 'expect';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import ManageRecipeForm
  from '../../../../src/components/dashboard/manageRecipe/ManageRecipeForm.jsx';

const props = {
  recipeDetail: '',
  ingredients: '',
  directions: '',
  error: null,
  recipes: [],
  userRecipes: [],
  onChange: jest.fn(() => Promise.resolve()),
  onImageChange: jest.fn(() => Promise.resolve()),
  updateRecipe: jest.fn(() => Promise.resolve()),
  deleteRecipe: jest.fn(() => Promise.resolve()),
  loadRecipe: jest.fn(() => Promise.resolve()),
};

/**
 *
 * @return { * } null
 */
const setup = () => shallow(<ManageRecipeForm {...props} />);

const loadRecipe = jest.fn();

describe('<ManageRecipeForm', () => {
  it('renders ManageRecipeForm without crashing if error is not available', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('button').length).toBe(2);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('textarea').length).toBe(3);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders ManageRecipeForm without crashing if error is available', () => {
    props.error = <div />;
    const event = {
      target: {
        name: 'recipeId',
        value: 2
      }
    };
    const wrapper = shallow(<ManageRecipeForm {...props} />);
    expect(wrapper).toBeDefined();
    // const recipeId = { value: 1 };
    // wrapper.recipeId = recipeId;
    // // wrapper.loadRecipe = recipeId;
    // wrapper.ref('recipeId').simulate('change', event);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('button').length).toBe(2);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('textarea').length).toBe(3);
    expect(wrapper.exists()).toBe(true);
    // expect(wrapper.loadRecipe()).toBe(true);
  });
});
