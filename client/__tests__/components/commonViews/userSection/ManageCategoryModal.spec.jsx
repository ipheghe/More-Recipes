import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import ManageCategoryModal
  from '../../../../src/commonViews/userSection/ManageCategoryModal.jsx';

const props = {
  isOpen: jest.fn(),
  onClose: jest.fn(),
  closeModal: jest.fn(),
  error: null,
  value: 'cakes',
  onChange: jest.fn(),
  onUpdate: jest.fn(),
  onDelete: jest.fn(),
};

/**
 *@description  setup function to mount component
 *
 * @return { * } null
 */
const setup = () => shallow(<ManageCategoryModal {...props} />);

describe('<ManageCategoryModal', () => {
  it(`renders ManageCategoryModal component
     without crashing if error props is null`, () => {
      const wrapper = setup();
      expect(wrapper).toBeDefined();
      expect(wrapper.find('Modal').length).toBe(1);
      expect(wrapper.find('input').length).toBe(1);
      expect(wrapper.exists()).toBe(true);
    });

  it(`renders ManageCategoryModal component
     without crashing if error props is not null`, () => {
      props.error = jest.fn();
      const wrapper = shallow(<ManageCategoryModal {...props} />);
      expect(wrapper).toBeDefined();
      expect(wrapper.find('Modal').length).toBe(1);
      expect(wrapper.find('input').length).toBe(1);
      expect(wrapper.exists()).toBe(true);
    });
});
