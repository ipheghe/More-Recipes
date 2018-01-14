import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import AddRecipeForm from '../../../../src/components/dashboard/addRecipe/AddRecipeForm.jsx';

const props = {
  recipeName: '',
  recipeDetail: '',
  ingredients: '',
  directions: jest.fn(() => Promise.resolve()),
  error: null,
  onChange: jest.fn(() => Promise.resolve()),
  onImageChange: jest.fn(() => Promise.resolve()),
  addRecipe: jest.fn(() => Promise.resolve()),
};

/**
 *
 * @return { * } null
 */
const setup = () => shallow(<AddRecipeForm {...props} />);

describe('<AddRecipeForm', () => {
  it('renders AddRecipeForm without crashing if error is not available', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('input').length).toBe(3);
    expect(wrapper.find('textarea').length).toBe(2);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders AddRecipeForm without crashing if error is available', () => {
    props.error = jest.fn();
    const wrapper = shallow(<AddRecipeForm {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('input').length).toBe(3);
    expect(wrapper.find('textarea').length).toBe(2);
    expect(wrapper.exists()).toBe(true);
  });
});
