import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import mockAuthCheck from '../__mocks__/mockAuthCheck';
import { upvoteRecipe, downvoteRecipe } from '../../src/actions/voteActions';

let store = null;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('>>>A C T I O N --- voteActions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    mockAuthCheck();
  });
  afterEach(() => moxios.uninstall());

  // Upvote Recipe Action
  describe('upvote recipe action', () => {
    it('should create a UPVOTE_RECIPE action', async (done) => {
      moxios.stubRequest('/api/v1/recipe/1/vote', {
        status: 200,
        response: {
          status: 'success',
          message: 'Your vote has been recorded',
        }
      });

      const expectedActions = [
        {
          payload: {
            message: 'Your vote has been recorded',
            status: 'success'
          },
          type: 'UPVOTE_RECIPE'
        }
      ];
      await store.dispatch(upvoteRecipe(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Downvote Recipe Action
  describe('downvote recipe action', () => {
    it('should create a DOWNVOTE_RECIPE action', async (done) => {
      moxios.stubRequest('/api/v1/recipe/1/vote?sort=downvotes', {
        status: 200,
        response: {
          status: 'success',
          message: 'Your vote has been recorded',
        }
      });

      const expectedActions = [
        {
          payload: {
            message: 'Your vote has been recorded',
            status: 'success'
          },
          type: 'DOWNVOTE_RECIPE'
        }
      ];
      await store.dispatch(downvoteRecipe(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });
});
