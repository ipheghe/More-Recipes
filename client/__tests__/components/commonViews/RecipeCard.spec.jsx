import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import RecipeCard from '../../../src/components/recipeCard/RecipeCard.jsx';

const recipe =
{
  name: 'Jollof Rice',
  description: 'Sweet and Delicious',
  ingredients: 'rice, maggi, tomato',
  directions: 'boil rice, fry stew',
  imageUrl: '/assets/image/pizza1.jpg',
  Recipe: {
    id: 1
  }
};
const props = {
  recipe
};

/**
 * @description function to mount component
 *
 * @return { * } null
 */
const setup = () => shallow(<RecipeCard {...props} />);

describe('<RecipeCard', () => {
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });
  it('renders without crashing if imageUrl is null', () => {
    props.recipe.imageUrl = null;
    const wrapper = shallow(<RecipeCard {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });
});
