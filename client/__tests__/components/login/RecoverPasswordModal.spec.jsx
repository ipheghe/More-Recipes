import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import RecoverPasswordModal
  from '../../../src/components/login/RecoverPasswordModal.jsx';

/**
 *@description setup function to mount component
 *
 * @return { * } null
 */
const setup = () => {
  const props = {
    isOpen: true,
    onClose: jest.fn(),
    email: 'okon@yahoo.com',
    error: null,
    onChange: jest.fn(),
    resetPassword: jest.fn(),
  };
  return mount(<RecoverPasswordModal {...props} />);
};

describe('<RecoverPasswordModal', () => {
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });
  it('allows us to set props', () => {
    const wrapper = setup(false);
    expect(wrapper.props().isOpen).toEqual(true);
    wrapper.setProps({ email: 'okon@yahoo.com' });
    expect(wrapper.props().email).toEqual('okon@yahoo.com');
  });
});
