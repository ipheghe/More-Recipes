import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { Footer } from '../../../src/commonViews';

/**
 *@description  setup function to mount component
 *
 * @return { * } null
 */
const setup = () => shallow(<Footer />);

describe('<Footer', () => {
  it('renders Footer component without crashing', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.exists()).toBe(true);
  });
});
