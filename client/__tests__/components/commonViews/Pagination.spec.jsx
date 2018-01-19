import expect from 'expect';
import React from 'react';
import { shallow, mount } from 'enzyme';
import Pagination from '../../../src/commonViews/Pagination.jsx';

const props = {
  pageNumber: 3,
  onPaginateClick: jest.fn(),
  next: jest.fn(),
  previous: jest.fn(),
  currentPaginatePage: 1,
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
    expect(wrapper.exists()).toBe(true);
  });
});
