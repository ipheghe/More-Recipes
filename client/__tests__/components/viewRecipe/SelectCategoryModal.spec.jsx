import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import SelectCategoryModal
  from '../../../src/components/viewRecipe/SelectCategoryModal.jsx';
import mockItems from '../../__mocks__/mockItems';

/**
 *@description setup function to mount component
 *
 * @return { * } null
 */
const setup = () => {
  const props = {
    isOpen: true,
    onClose: jest.fn(),
    categories: [mockItems.category],
    categoryInput: jest.fn(),
    favoriteRecipe: jest.fn(),
  };
  return mount(<SelectCategoryModal {...props} />);
};

describe('<SelectCategoryModal', () => {
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Modal').length).toBe(1);
    expect(wrapper.exists()).toBe(true);
  });
});
