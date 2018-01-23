import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { RecipeList } from '../../../src/commonViews';

const recipeList = [
  {
    name: 'Jollof Rice',
    description: 'Sweet and Delicious',
    ingredients: 'rice, maggi, tomato',
    directions: 'boil rice, fry stew',
    imageUrl: '/assets/image/pizza1.jpg',
    Recipe: {
      id: 1
    }
  }
];
const props = {
  recipes: recipeList
};

/**
 * @description function to mount component
 *
 * @return { * } null
 */
const setup = () => shallow(<RecipeList {...props} />);

describe('<RecipeList', () => {
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.find('RecipeCard').length).toBe(1);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders component without any recipe card', () => {
    props.recipes = [];
    const wrapper = shallow(<RecipeList {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('RecipeCard').length).toBe(0);
    expect(wrapper.exists()).toBe(true);
  });
});
