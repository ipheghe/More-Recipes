import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import ReviewBox from '../../../src/commonViews/ReviewBox.jsx';

const props = {
  fullName: 'Okon Jack',
  createdAt: '2018-1-13',
  message: 'niceMeal'
};

/**
 *@description  setup function to mount component
 *
 * @return { * } null
 */
const setup = () => shallow(<ReviewBox {...props} />);

describe('<ReviewBox', () => {
  it('renders ReviewBox component without crashing', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.find('img').length).toBe(1);
    expect(wrapper.exists()).toBe(true);
  });
});

