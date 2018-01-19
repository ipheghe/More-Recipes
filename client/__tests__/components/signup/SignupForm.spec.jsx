import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import SignupForm from '../../../src/components/signup/SignupForm.jsx';

/**
 *
 * @return { * } null
 */
const setup = () => {
  const props = {
    username: 'okon',
    password: 'abcde',
    fullName: 'Okon Emma',
    mobileNumber: '08023456729',
    email: 'okon@yahoo.com',
    error: null,
    onChange: jest.fn(),
    signup: jest.fn()
  };
  return mount(<SignupForm {...props} />);
};

describe('<SignupForm', () => {
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });
});
