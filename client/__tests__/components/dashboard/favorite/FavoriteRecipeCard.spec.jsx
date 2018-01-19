import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import FavoriteRecipeCard
  from '../../../../src/components/dashboard/favorite/FavoriteRecipeCard.jsx';

const recipe =
{
  Recipe: {
    id: 1,
    name: 'Jollof Rice',
    description: 'Sweet and Delicious',
    ingredients: 'rice, maggi, tomato',
    directions: 'boil rice, fry stew',
    imageUrl: '/assets/image/pizza1.jpg',
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
const setup = () => shallow(<FavoriteRecipeCard {...props} />);

describe('<FavoriteRecipeCard', () => {
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });
  it('assigns a default image if imageUrl is null', () => {
    props.recipe.Recipe.imageUrl = null;
    const wrapper = shallow(<FavoriteRecipeCard {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.instance().props.recipe.Recipe.imageUrl)
      .toEqual(null);
    expect(wrapper.exists()).toBe(true);
  });
});
