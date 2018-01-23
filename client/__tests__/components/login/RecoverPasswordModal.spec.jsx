import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import RecoverPasswordModal
  from '../../../src/components/Login/RecoverPasswordModal';

const props = {
  isOpen: true,
  onClose: jest.fn(),
  email: 'okon@yahoo.com',
  error: null,
  onChange: jest.fn(),
  resetPassword: jest.fn(),
};

/**
 *@description setup function to mount component
 *
 * @return { * } null
 */
const setup = () => mount(<RecoverPasswordModal {...props} />);

describe('<RecoverPasswordModal', () => {
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it(`renders RecoverPasswordModal component without 
     crashing if error is not null`, () => {
      props.error = <div />;
      const wrapper = shallow(<RecoverPasswordModal {...props} />);
      expect(wrapper.find('Modal').length).toBe(1);
      expect(wrapper.find('button').length).toBe(3);
      expect(wrapper.find('input').length).toBe(1);
      expect(wrapper.exists()).toBe(true);
    });
});
