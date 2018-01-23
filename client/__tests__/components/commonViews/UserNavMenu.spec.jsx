import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { UserNavMenu } from '../../../src/commonViews';

/**
 *@description  setup function to mount component
 *
 * @return { * } null
 */
const setup = () => shallow(<UserNavMenu />);

describe('<UserNavMenu', () => {
  it('renders UserNavMenu component without crashing', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.find('NavLink').length).toBe(5);
    expect(wrapper.exists()).toBe(true);
  });
});
