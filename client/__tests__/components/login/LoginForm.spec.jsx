import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../../../src/components/login/LoginForm.jsx';

/**
 *@description setup function to mount component
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
  return shallow(<LoginForm {...props} />);
};

describe('<LoginForm', () => {
  it('renders LoginForm without crashing', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(3);
    expect(wrapper.exists()).toBe(true);
  });
});
