import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import EditProfileForm
  from '../../../src/components/EditProfile/EditProfileForm';

const props = {
  username: 'okon',
  password: 'abcde',
  fullName: 'Okon Emma',
  mobileNumber: '08023456729',
  email: 'okon@yahoo.com',
  error: null,
  onChange: jest.fn(),
  updateProfile: jest.fn()
};

/**
 *
 * @return { * } null
 */
const setup = () => mount(<EditProfileForm {...props} />);

describe('<EditProfileForm', () => {
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it('renders EditProfileForm without crashing if error is available', () => {
    props.error = jest.fn();
    const wrapper = shallow(<EditProfileForm {...props} />);
    expect(wrapper).toBeDefined();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('button').length).toBe(2);
    expect(wrapper.find('input').length).toBe(4);
    expect(wrapper.exists()).toBe(true);
  });
});
