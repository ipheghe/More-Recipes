import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../../../src/commonViews/Pagination.jsx';

const props = {
  pageNumber: 3,
  onPaginateClick: 1,
  next: jest.fn(),
  previous: jest.fn()
};

/**
 *@description  setup function to mount component
 *
 * @return { * } null
 */
const setup = () => shallow(<Pagination {...props} />);

describe('<Pagination', () => {
  it('renders Pagination component without crashing', () => {
    const wrapper = setup();
    expect(wrapper).toBeDefined();
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.exists()).toBe(true);
  });
});
