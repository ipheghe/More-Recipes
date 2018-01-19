import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import superagent from 'superagent';
import configureMockStore from 'redux-mock-store';
import mockAuthCheck from '../__mocks__/mockAuthCheck';
import { uploadImage } from '../../src/actions/uploadImageActions';

let store = null;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const imageFile = {
  name: '/Users/andeladeveloper/Desktop/More-Recipes/' +
  'template/images/sharwama.jpg',
  size: 61387,
  type: 'image/jpeg'
};
jest.mock('superagent');

describe('>>>A C T I O N --- uploadImageActions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    mockAuthCheck();
  });
  afterEach(() => moxios.uninstall());

  // Make Successful Image Request Action
  describe('Make Successful Image Request action', () => {
    it('should call image request action and ' +
    'dispatch uploadImageResponse action ', () => {
      superagent.post = () => ({
        attach: jest.fn(),
        field: jest.fn(),
        end: fn => fn(null, {
          body: {
            url: 'http://res.cloudinary.com/dd3lv0o93/image/' +
            'upload/v1516006383/hghev3xifrmlmeqbocmp.png'
          }
        })
      });
      const expectedActions = [
        {
          imageData: {
            name: '/Users/andeladeveloper/Desktop/More-Recipes/' +
            'template/images/sharwama.jpg',
            size: 61387,
            type: 'image/jpeg'
          },
          type: 'IMAGE_FILE_REQUEST'
        }, {
          response: 'http://res.cloudinary.com/dd3lv0o93/image/upload/' +
          'v1516006383/hghev3xifrmlmeqbocmp.png',
          type: 'IMAGE_FILE_SUCCESSFUL'
        }];
      store.dispatch(uploadImage(imageFile));
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  // Make Failed Image Request Action
  describe('Make Failed Image Request action', () => {
    it('should call image request action and ' +
      'dispatch uploadImageFailed action ', () => {
      superagent.post = () => ({
        attach: jest.fn(),
        field: jest.fn(),
        end: fn => fn({ message: 'error uploading image' }, {
          body: {
            url: 'http://res.cloudinary.com/dd3lv0o93/image/' +
            'upload/v1516006383/hghev3xifrmlmeqbocmp.png'
          }
        })
      });
      const expectedActions = [
        {
          imageData:
          {
            name: '/Users/andeladeveloper/Desktop/More-Recipes/' +
            'template/images/sharwama.jpg',
            size: 61387,
            type: 'image/jpeg'
          },
          type: 'IMAGE_FILE_REQUEST'
        }, {
          error: { message: 'error uploading image' },
          type: 'IMAGE_FILE_FAILURE'
        }];
      store.dispatch(uploadImage(imageFile));
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });

  // Make Failed Image Request Action
  describe('Make Failed Image Request action', () => {
    it('should call image request action and ' +
        'dispatch uploadImageFailed action ', () => {
      superagent.post = () => ({
        attach: jest.fn(),
        field: jest.fn(),
        end: fn => fn({ message: 'error uploading image' }, {
          body: {
            url: 'http://res.cloudinary.com/dd3lv0o93/image/' +
            'upload/v1516006383/hghev3xifrmlmeqbocmp.png'
          }
        })
      });
      const expectedActions = [
        {
          imageData:
            {
              name: '/Users/andeladeveloper/Desktop/More-Recipes/' +
              'template/images/sharwama.jpg',
              size: 61387,
              type: 'image/jpeg'
            },
          type: 'IMAGE_FILE_REQUEST'
        }, {
          error: { message: 'error uploading image' },
          type: 'IMAGE_FILE_FAILURE'
        }];
      store.dispatch(uploadImage(imageFile));
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
    });
  });
});
