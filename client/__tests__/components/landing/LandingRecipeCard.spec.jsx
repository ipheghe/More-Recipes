import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import LandingRecipeCard from '../../../src/components/landing/LandingRecipeCard.jsx';

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
 *@description  setup function to mount component
 *
 * @return { * } null
 */
const setup = () => shallow(<LandingRecipeCard {...props} />);

describe('<LandingRecipeCard', () => {
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it('renders without crashing if imageUrl is null', () => {
    props.recipe.imageUrl = null;
    const wrapper = shallow(<LandingRecipeCard {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });
});
