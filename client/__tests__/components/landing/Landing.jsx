import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { Landing } from '../../../src/components';
import mockItems from '../../__mocks__/mockItems';

let event;

/**
 * @param { boolean } loading
 *
 * @return { * } null
 */
const setup = () => {
  const props = {
    recipeList: mockItems.recipeArray,
    actions: {
      userActions: {
        signUpUser: jest.fn()
      }
    }
  };
  return mount(<Landing {...props} />);
};

describe('<Landing', () => {
  it('renders without crashing', () => {
    const wrapper = setup(false);
    expect(wrapper.find('Navigation').length).toBe(1);
    expect(wrapper.find('Section').length).toBe(1);
    expect(wrapper.find('Card').length).toBe(1);
    expect(wrapper.find('SignUpForm').length).toBe(1);
    expect(wrapper.find('SignUpFooter').length).toBe(1);
  });
  it('should show a loader when passwordIsLoading is true', () => {
    const wrapper = setup(true);
    expect(wrapper.find('Loader').length).toEqual(1);
  });
  it('should call the setUserDetails method', () => {
    const wrapper = setup(true);
    const handleChangeSpy = jest.spyOn(wrapper.instance(), 'setUserDetails');
    event = {
      preventDefault: jest.fn(),
      target: {
        username: 'testuser',
        email: 'testuser@gmail.com',
        password: 'topper234',
        confirmPassword: 'topper234'
      }
    };
    wrapper.instance().setUserDetails(event);
    expect(handleChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the registerUser method', () => {
    const wrapper = setup(false);
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'registerUser');
    wrapper.instance().registerUser(event);
    expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
  });
  it('should set the confirmPasswordError state to password do not match', () => {
    const wrapper = setup(false);
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'registerUser');
    event = {
      preventDefault: jest.fn(),
      target: {
        username: 'testuser',
        email: 'testuser@gmail.com',
        password: 'topper',
        confirmPassword: 'topper234'
      }
    };
    wrapper.setState({ user: event.target });
    wrapper.instance().registerUser(event);
    expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().passwordError)
      .toEqual('Confirm password does not match password');
  });
  it(
    'should set the confirmPasswordError state to password must be at least 6 characters',
    () => {
      const wrapper = setup(false);
      const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'registerUser');
      event = {
        preventDefault: jest.fn(),
        target: {
          username: 'testuser',
          email: 'testuser@gmail.com',
          password: 'top',
          confirmPassword: 'top'
        }
      };
      wrapper.setState({ user: event.target });
      wrapper.instance().registerUser(event);
      expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
      expect(wrapper.state().passwordError)
        .toEqual('Passwords must be at least 6 characters');
    }
  );
  it('should sign up user and set the passwordError to empty', () => {
    const wrapper = setup(false);
    const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'registerUser');
    event = {
      preventDefault: jest.fn(),
      target: {
        username: 'testuser',
        email: 'testuser@gmail.com',
        password: 'topper234',
        confirmPassword: 'topper234'
      }
    };
    wrapper.setState({ user: event.target });
    wrapper.instance().registerUser(event);
    expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.state().passwordError).toEqual('');
  });
});
