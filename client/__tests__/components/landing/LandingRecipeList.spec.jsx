import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import LandingRecipeList from
  '../../../src/components/landing/LandingRecipeList.jsx';

/**
 *@description  setup function to mount component
 *
 * @return { * } null
 */
const setup = () => {
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
  return shallow(<LandingRecipeList {...props} />);
};

describe('<LandingRecipeList', () => {
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.find('LandingRecipeCard').length).toBe(1);
    expect(wrapper.exists()).toBe(true);
  });
});
