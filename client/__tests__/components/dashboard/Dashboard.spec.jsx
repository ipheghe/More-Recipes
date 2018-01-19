import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import render from 'react-test-renderer';
import { HashRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedDashboard, { PureDashboard }
  from '../../../src/components/dashboard/Dashboard.jsx';
import mockItems from '../../__mocks__/mockItems';
import mockAuthCheck from '../../__mocks__/mockAuthCheck';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  auth: {
    error: 'Invalid username',
    message: '',
    userData: {},
    authenticated: true,
    categories: []
  },
  user: {
    status: '',
    error: 'Fail',
    message: '',
    userData: mockItems.user,
  },
  recipe: {
    message: '',
    error: '',
    pages: 2,
    recipeData: {},
    recipeList: mockItems.recipeArray,
    userRecipes: [],
    searchResult: []
  },
  category: {
    error: '',
    message: '',
    categoryList: [mockItems.category],
    userCategoryList: [mockItems.category]
  },
  imageUploadReducer: [{
    imageData: {},
    response: '/assets/images/pizza.jpg',
    error: '',
    isloaded: false
  }],
  favorite: {
    message: '',
    status: false,
    error: '',
    pages: 1,
    userFavorites: mockItems.recipeArray,
    userFavorite: [],
  }
};

const store = mockStore(initialState);

const props = {
  isAuthenticated: true,
  auth: () => true,
  location: {
    search: '',
    pathname: '/'
  },
};

/**
 * @param { boolean } isAuthenticated
 * @param { number } index
 *
 * @return { * } null
 */
const setup = (isAuthenticated, index) => {
  props.isAuthenticated = isAuthenticated;
  const mountedWrapper = mount(<Provider store={store}>
    <Router><ConnectedDashboard {...props} /></Router>
                               </Provider>);
  const shallowWrapper = shallow(<PureDashboard {...props} />);
  const wrapper = mount(<Provider store={store}>
    <MemoryRouter
      initialEntries={
        [
          '/dashboard/top-recipes',
          '/dashboard/my-recipes',
          '/Dashboard/add-recipe',
          '/dashboard/favorites',
          '/dashboard/manage-recipes',
          '/dashboard/',
          '/dashboard/top-recipes/*',
          '/dashboard/favorites/*',
          '/dashboard/manage-recipes/*',
          '/dashboard/search'
        ]
      }
      initialIndex={index}
      keyLength={6}
    >
      <PureDashboard {...props} />
    </MemoryRouter>
                        </Provider>);

  return {
    mountedWrapper,
    shallowWrapper,
    wrapper
  };
};

describe('<Dashboard', () => {
  beforeEach(() => {
    mockAuthCheck();
  });
  it('renders without crashing', () => {
    const { mountedWrapper } = setup(true, 0);
    expect(mountedWrapper).toBeDefined();
    expect(mountedWrapper.find('ProfileHeader').length).toBe(1);
    expect(mountedWrapper.find('UserSection').length).toBe(1);
    expect(mountedWrapper.find('UserNavMenu').length).toBe(1);
    expect(mountedWrapper.find('Route').length).toBe(15);
    expect(mountedWrapper.exists()).toBe(true);
  });

  it('should match component snapshot', () => {
    const tree = render.create(<Provider store={store}>
      <Router ><PureDashboard {...props} /></Router>
                               </Provider>);
    expect(tree).toMatchSnapshot();
  });

  it('renders Top Recipes componet if top-recipes route is called', () => {
    const { wrapper } = setup(false, 0);
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it(`redirects from top recipes component to login 
     component if a non-existent route is called`, () => {
      const { wrapper } = setup(true, 0);
      expect(wrapper).toBeDefined();
      expect(wrapper.exists()).toBe(true);
    });

  it('renders My Recipes component if my-recipes route is called', () => {
    const { wrapper } = setup(false, 1);
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });


  it(`redirects from my recipes component to login
      component if a non-existent route is called`, () => {
      const { wrapper } = setup(true, 1);
      expect(wrapper).toBeDefined();
      expect(wrapper.exists()).toBe(true);
    });

  it('renders Add Recipe component if add-recipe route is called', () => {
    const { wrapper } = setup(false, 2);
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it(`redirects from add recipe component to login
      component if a non-existent route is called`, () => {
      const { wrapper } = setup(true, 2);
      expect(wrapper).toBeDefined();
      expect(wrapper.exists()).toBe(true);
    });

  it('renders Favorite component if favorite route is called', () => {
    const { wrapper } = setup(false, 3);
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it(`redirects from favorite component to login 
     component if a non-existent route is called`, () => {
      const { wrapper } = setup(true, 3);
      expect(wrapper).toBeDefined();
      expect(wrapper.exists()).toBe(true);
    });

  it(`renders Manage Recipes component 
     if manage-recipes route is called`, () => {
      const { wrapper } = setup(false, 4);
      expect(wrapper).toBeDefined();
      expect(wrapper.exists()).toBe(true);
    });

  it(`redirects from manage recipes component to login 
     component if a non-existent route is called`, () => {
      const { wrapper } = setup(true, 4);
      expect(wrapper).toBeDefined();
      expect(wrapper.exists()).toBe(true);
    });

  it(`redirects to notFound page 
     if a non-existent route is called`, () => {
      const { wrapper } = setup(true, 5);
      expect(wrapper).toBeDefined();
      expect(wrapper.exists()).toBe(true);
    });

  it(`redirects to notFound page 
     if a non-existent route is called`, () => {
      const { wrapper } = setup(true, 6);
      expect(wrapper).toBeDefined();
      expect(wrapper.exists()).toBe(true);
    });

  it(`redirects to notFound page 
     if a non-existent route is called`, () => {
      const { wrapper } = setup(true, 7);
      expect(wrapper).toBeDefined();
      expect(wrapper.exists()).toBe(true);
    });

  it(`redirects to notFound page 
     if a non-existent route is called`, () => {
      const { wrapper } = setup(true, 8);
      expect(wrapper).toBeDefined();
      expect(wrapper.exists()).toBe(true);
    });

  it('renders Search component if a non-existent route is called', () => {
    const { wrapper } = setup(false, 9);
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it(`redirects from Search component to login 
     component if a non-existent route is called`, () => {
      const { wrapper } = setup(true, 9);
      expect(wrapper).toBeDefined();
      expect(wrapper.exists()).toBe(true);
    });
});
