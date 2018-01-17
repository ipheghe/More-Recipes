import expect from 'expect';
import React from 'react';
import { shallow, mount } from 'enzyme';
import ManageRecipeForm
  from '../../../../src/components/dashboard/manageRecipe/ManageRecipeForm.jsx';
import mockItems from '../../../__mocks__/mockItems';

const props = {
  recipeDetail: '',
  ingredients: '',
  directions: '',
  error: null,
  recipes: [],
  userRecipes: [mockItems.recipe],
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

  it('renders ManageRecipeForm component and loads all recipes on the select tag', () => {
    props.recipes = mockItems.recipeArray;
    const wrapper = mount(<ManageRecipeForm {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('button').length).toBe(2);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('textarea').length).toBe(3);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders ManageRecipeForm without crashing if error is available', () => {
    props.error = <div />;
    const wrapper = mount(<ManageRecipeForm {...props} />);
    const event = { target: { name: 'recipeId', value: 0 } };
    const recipeIdInput = wrapper.find('.form-control.click');
    event.target.value = 1;
    recipeIdInput.simulate('change', event);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('button').length).toBe(2);
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('textarea').length).toBe(3);
    expect(wrapper.exists()).toBe(true);
  });
});
