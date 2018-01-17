import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import mockAuthCheck from '../__mocks__/mockAuthCheck';
import mockItems from '../__mocks__/mockItems';
import { uploadImageRequest, uploadImageResponse, uploadImage, uploadImageFailed } from '../../src/actions/uploadImageActions';

let store = null;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('>>>A C T I O N --- uploadImageActions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    mockAuthCheck();
  });
  afterEach(() => moxios.uninstall());

  // Make Image Request Action
  describe('Make Image Request action', () => {
    it('should make an image request action', () => {
      const imageData = {
        file: '/assets/images/pizza.jpg'
      };
      const expectedActions = {
        imageData: {
          file: '/assets/images/pizza.jpg'
        },
        type: 'IMAGE_FILE_REQUEST'
      };
      expect(uploadImageRequest(imageData)).toEqual(expectedActions);
    });
  });

  // retrieve image url successfully
  it('should retrieve image url on request success', () => {
    const response = '/assets/images/sharwama';
    const expectedActions = { response: '/assets/images/sharwama', type: 'IMAGE_FILE_SUCCESSFUL' };
    expect(uploadImageResponse(response)).toEqual(expectedActions);
  });

  // retrieve error when image upload is unsuccessful
  it('should retrieve image url on request failure', () => {
    const error = 'Something went wrong, please try again';
    const expectedActions = { error: 'Something went wrong, please try again', type: 'IMAGE_FILE_FAILURE' };
    expect(uploadImageFailed(error)).toEqual(expectedActions);
  });

  // upload image action
  it('should retrieve image url on request failure', () => {
    // moxios.stubRequest(null, {
    //   status: 200,
    //   response: {
    //     message: 'All Reviews Retrieved SuccessFullly!',
    //     reviews: [mockItems.review]
    //   }
    // });
    const imageData = {
      name: 'sharwama.jpg',
      size: 61387,
      type: 'image/jpeg'
    };
    const error = 'Something went wrong, please try again';
    const expectedActions = { error: 'Something went wrong, please try again', type: 'IMAGE_FILE_FAILURE' };
    store.dispatch(uploadImage(imageData))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
  });
});
