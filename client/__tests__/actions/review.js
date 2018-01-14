import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import mockAuthCheck from '../__mocks__/mockAuthCheck';
import mockItems from '../__mocks__/mockItems';
import { postReview, getReviews } from '../../src/actions/reviewActions';

let store = null;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('>>>A C T I O N --- reviewActions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    mockAuthCheck();
  });
  afterEach(() => moxios.uninstall());

  // Add Recipe Action
  describe('Add review action', () => {
    it('should create a REVIEW_RECIPE action', (done) => {
      moxios.stubRequest('/api/v1/recipe/1/review', {
        status: 201,
        response: {
          message: 'Review Posted Successfully',
          review: mockItems.review
        }
      });

      const expectedActions = [
        {
          payload: {
            message: 'Review Posted Successfully',
            review: {
              id: 1, message: 'Lovely meal', recipeId: 1, userId: 1
            }
          },
          type: 'REVIEW_RECIPE'
        }
      ];
      store.dispatch(postReview(mockItems.review.message, 1))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Get recipe reviews
  describe('retrieve reviews action', () => {
    it('should create a FETCH_TOP_RECIPES action', async (done) => {
      moxios.stubRequest('/api/v1/reviews/1', {
        status: 200,
        response: {
          message: 'All Reviews Retrieved SuccessFullly!',
          reviews: [mockItems.review]
        }
      });

      const expectedActions = [
        {
          payload: {
            message: 'All Reviews Retrieved SuccessFullly!',
            reviews: [{
              id: 1, message: 'Lovely meal', recipeId: 1, userId: 1
            }]
          },
          type: 'RETRIEVE_RECIPE_REVIEWS'
        }
      ];
      await store.dispatch(getReviews(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });
});
