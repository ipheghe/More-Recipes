import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import ChangePasswordModal
  from '../../../../src/commonViews/UserSection/ChangePasswordModal';

const props = {
  isOpen: true,
  onClose: jest.fn(),
  closeModal: jest.fn(),
  error: null,
  oldPasswordValue: 'abcde',
  newPasswordValue: 'abcdef',
  confirmPasswordValue: 'abcdef',
  onChange: jest.fn(),
  onUpdate: jest.fn(),
};

/**
 *@description  setup function to mount component
 *
 * @return { * } null
 */
const setup = () => shallow(<ChangePasswordModal {...props} />);

describe('<ChangePasswordModal', () => {
  it(`renders ChangePasswordModal component
    without crashing if error props is null`, () => {
      const wrapper = setup();
      expect(wrapper).toBeDefined();
      expect(wrapper.find('Modal').length).toBe(1);
      expect(wrapper.find('form').length).toBe(1);
      expect(wrapper.find('input').length).toBe(3);
      expect(wrapper.exists()).toBe(true);
    });

  it(`renders ChangePasswordModal component
     without crashing if error props is not null`, () => {
      props.error = <div />;
      const wrapper = shallow(<ChangePasswordModal {...props} />);
      expect(wrapper).toBeDefined();
      expect(wrapper.find('Modal').length).toBe(1);
      expect(wrapper.find('form').length).toBe(1);
      expect(wrapper.find('input').length).toBe(3);
      expect(wrapper.exists()).toBe(true);
    });
});
