import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import LoginForm from '../../../src/components/login/LoginForm.jsx';

/**
 *
 * @return { * } null
 */
const setup = () => {
  const props = {
    username: 'okon',
    password: 'abcde',
    error: null,
    onChange: jest.fn(),
    openModal: jest.fn(),
    login: jest.fn(),
  };
  return mount(<LoginForm {...props} />);
};

describe('<LoginForm', () => {
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });
  it('allows us to set props', () => {
    const wrapper = setup(false);
    expect(wrapper.props().username).toEqual('okon');
    wrapper.setProps({ username: 'okon' });
    expect(wrapper.props().username).toEqual('okon');
  });
});
