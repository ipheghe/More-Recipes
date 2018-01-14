import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import ResetPasswordForm from '../../../src/components/resetPassword/ResetPasswordForm.jsx';

const props = {
  newPassword: 'abcdef',
  confirmPassword: 'abcde',
  error: null,
  onChange: jest.fn(),
  resetPassword: jest.fn(),
};

/**
 *@description setup function to mount component
 *
 * @return { * } null
 */
const setup = () => shallow(<ResetPasswordForm {...props} />);

describe('<ResetPasswordForm', () => {
  it('renders ResetPasswordForm component without crashing if error is not available', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(2);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders AddRecipeForm without crashing if error is available', () => {
    props.error = jest.fn();
    const wrapper = shallow(<ResetPasswordForm {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('input').length).toBe(2);
    expect(wrapper.exists()).toBe(true);
  });
});
