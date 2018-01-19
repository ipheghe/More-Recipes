import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import MainHeader from '../../../src/commonViews/MainHeader.jsx';

/**
 *@description  setup function to mount component
 *
 * @return { * } null
 */
const setup = () => shallow(<MainHeader />);

describe('<MainHeader', () => {
  it('renders without crashing', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.find('header').length).toBe(1);
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('NavLink').length).toBe(3);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders the landing component when home tab is clicked', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.nav-item.nav-home').simulate('click'));
  });
});

