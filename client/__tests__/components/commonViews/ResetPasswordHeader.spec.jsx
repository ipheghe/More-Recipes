import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { ResetPasswordHeader }
  from '../../../src/commonViews';

/**
 *@description  setup function to mount component
 *
 * @return { * } null
 */
const setup = () => shallow(<ResetPasswordHeader />);

describe('<ResetPasswordHeader', () => {
  it('renders ResetPasswordHeader component without crashing', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.find('NavLink').length).toBe(1);
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.exists()).toBe(true);
  });
});
