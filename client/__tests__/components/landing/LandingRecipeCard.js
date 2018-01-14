import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import LandingRecipeCard from '../../../src/components/landing/LandingRecipeCard.jsx';
import mockItems from '../../__mocks__/mockItems';

/**
 *
 * @return { * } null
 */
const setup = () => mount(<LandingRecipeCard recipe={mockItems.recipe} />);

describe('<Landing', () => {
  it('renders without crashing', () => {
    const wrapper = setup(false);
    expect(wrapper).toBeDefined();
    expect(true).toBe(true);
  });
  it('allows us to set props', () => {
    const wrapper = setup(false);
    expect(wrapper.props().recipe).toEqual(mockItems.recipe);
    wrapper.setProps({ recipe: mockItems.recipe });
    expect(wrapper.props().recipe).toEqual(mockItems.recipe);
  });
});
