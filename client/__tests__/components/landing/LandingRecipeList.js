import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import LandingRecipeList from '../../../src/components/landing/LandingRecipeCard.jsx';
import mockItems from '../../__mocks__/mockItems';

/**
 *
 * @return { * } null
 */
const setup = () => {
  const props = {
    recipes: mockItems.recipeArray,
    recipe: mockItems.recipe
  };
  return shallow(<LandingRecipeList {...props} />);
};

describe('<Landing', () => {
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.find('LandingRecipeCard').length).toBe(0);
    expect(true).toBe(true);
  });
});
