import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import AddRecipeForm
  from '../../../../src/components/Dashboard/AddRecipe/AddRecipeForm';

const props = {
  recipeName: '',
  recipeDetail: '',
  ingredients: '',
  directions: jest.fn(),
  error: null,
  onChange: jest.fn(),
  onImageChange: jest.fn(),
  addRecipe: jest.fn(),
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
