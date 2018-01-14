import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Landing } from '../../../src/components/landing/Landing.jsx';
import mockItems from '../../__mocks__/mockItems';

/**
 * @param { boolean } loading
 *
 * @return { * } null
 */
const setup = () => {
  const props = {
    recipeList: mockItems.recipeArray,
    getTopRecipesLanding: jest.fn(),
  };
  return shallow(<Landing {...props} />);
};

describe('<Landing', () => {
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper.find('MainHeader').length).toBe(1);
    expect(wrapper.find('Footer').length).toBe(1);
    expect(wrapper.find('LandingRecipeList').length).toBe(1);
    expect(true).toBe(true);
  });
  it('calls componentDidMount', () => {
    sinon.spy(Landing.prototype, 'componentDidMount');
    const wrapper = setup();
    expect(wrapper.exists()).toBe(true);
    expect(Landing.prototype.componentDidMount.calledOnce).toEqual(true);
  });
});
