import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import mockAuthCheck from '../__mocks__/mockAuthCheck';
import mockLocalStorage from '../__mocks__/mockLocalStorage';
import mockItems from '../__mocks__/mockItems';
import decodeToken from '../../../server/helpers/decodeToken';
import {
  registerUser,
  loginUser,
  fetchUsername,
  logoutUser
} from '../../src/actions/authActions';
import {
  updateUserRecord,
  changePassword,
  resetPassword,
  verifyTokenPassword
} from '../../src/actions/userActions';

let store = null;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('>>>A C T I O N --- authActions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });
  afterEach(() => moxios.uninstall());

  // Sign up User Action
  describe('User sign up action', () => {
    it('should create a USER_AUTH_SUCCESS action', (done) => {
      moxios.stubRequest('/api/v1/user/signup', {
        status: 201,
        response: {
          message: 'User account successfully created.',
          user: mockItems.user
        }
      });

      const expectedActions = [
        { type: 'AUTH_USER' }, {
          payload: {
            id: 'USER_REGISTERED',
            message: 'Registration Successful.',
            timeout: 5000,
            title: 'Success',
            type: 'success'
          },
          type: '@ReduxToastr/toastr/ADD'
        }
      ];
      store.dispatch(registerUser(mockItems.user))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Sign in User Action
  describe('User sign in action', () => {
    it('should create a AUTH_USER action', (done) => {
      moxios.stubRequest('/api/v1/user/signin', {
        status: 200,
        response: {
          message: 'Authentication & Login successful',
          user: mockItems.userSignin
        }
      });
      mockAuthCheck();

      const expectedActions = [
        { type: 'AUTH_USER' }, {
          payload: {
            id: 'USER_SIGNEDIN',
            message: 'Welcome Onboard!',
            timeout: 5000,
            title: 'Success',
            type: 'success'
          },
          type: '@ReduxToastr/toastr/ADD'
        }
      ];

      store.dispatch(loginUser(mockItems.userSignin))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Authenticated User Actions
  describe('User normal user actions with token', () => {
    beforeEach(() => {
      mockAuthCheck();
    });

    // Get user profile
    describe('Get user profile', () => {
      it('should create a GET_USER_PROFILE_SUCCESS action', async (done) => {
        const decodedToken = decodeToken(mockLocalStorage.getItem('token'));
        const { username } = decodedToken.user;
        moxios.stubRequest(`/api/v1/user/${username}`, {
          status: 200,
          response: mockItems.fetchUser
        });
        const expectedActions = [
          {
            type: 'FETCH_USER',
            payload: mockItems.user
          },
        ];
        await store.dispatch(fetchUsername())
          .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
            done();
          });
      });
    });

    // Update user profile
    describe('Update user profile', () => {
      it('should create a GET_USER_PROFILE_SUCCESS action', (done) => {
        moxios.stubRequest('/api/v1/user', {
          status: 200,
          response: {
            success: true,
            user: mockItems.user
          }
        });

        const expectedActions = [{
          payload: {
            success: true,
            user: {
              email: 'linda@gmail.com', fullName: 'Linda George', id: 1, mobileNumber: 2348034526172, password: 'abcde', username: 'linda'
            }
          },
          type: 'UPDATE_USER'
        }, {
          payload: {
            id: 'UPDATE_USER', message: 'User Profile updated Successfully', timeout: 5000, title: 'Success', type: 'success'
          },
          type: '@ReduxToastr/toastr/ADD'
        }];

        store.dispatch(updateUserRecord(mockItems.user))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
            done();
          });
      });
    });

    // Change password
    describe('Change password', () => {
      it('should create a CHANGE_PASSWORD_SUCCESS action', async (done) => {
        moxios.stubRequest('/api/v1/user/changePassword', {
          status: 200,
          response: {
            status: 'Success',
            message: 'User Password Changed SuccessFullly!'
          }
        });
        const expectedActions = [
          {
            payload:
            {
              message: 'User Password Changed SuccessFullly!', status: 'Success'
            },
            type: 'CHANGE_PASSWORD'
          }, {
            payload: {
              id: 'CHANGE_PASSWORD', message: 'User Password changed Successfully', timeout: 5000, title: 'Success', type: 'success'
            },
            type: '@ReduxToastr/toastr/ADD'
          }];
        await store.dispatch(changePassword(mockItems.changePassword))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
            done();
          });
      });
    });

    // Forgot password Action
    describe('Reset Password action', () => {
      it('should create a RESET_PASSWORD_SUCCESS action', async (done) => {
        moxios.stubRequest('/api/v1/user/forgotPassword', {
          status: 200,
          response: {
            message: 'Please check your email for the link to reset your password.',
            info: {
              from: '"MoreRecipes Admin" <iphegheovie@gmail.com>',
              to: 'iphegheovie@yahoo.com',
              subject: 'You have a new notification',
              text: `${'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://'}8000/#/reset-password/12345565\n\n` +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            }
          }
        });

        const expectedActions = [
          {
            payload:
          {
            info:
            {
              from: '"MoreRecipes Admin" <iphegheovie@gmail.com>',
              subject: 'You have a new notification',
              text:
              'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://8000/#/reset-password/12345565\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n' +
              '',
              to: 'iphegheovie@yahoo.com'
            },
            message: 'Please check your email for the link to reset your password.'
          },
            type: 'RESET_PASSWORD'
          },
          {
            payload:
          {
            id: 'RESET_PASSWORD',
            message: 'Password Reset Successfully! Please check your email to and follow link to create a new password',
            timeout: 5000,
            title: 'Success',
            type: 'success'
          },
            type: '@ReduxToastr/toastr/ADD'
          }
        ];

        await store.dispatch(resetPassword('linda@yahoo.com'))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
            done();
          });
      });
    });

    // Verify Token Password
    describe('Reset Password action', () => {
      it('should create a RESET_PASSWORD_SUCCESS action', async (done) => {
        moxios.stubRequest('/api/v1/user/reset-password/123456', {
          status: 200,
          response: {
            success: true,
            message: 'Reset password success'
          }
        });
        const expectedActions = [
          {
            payload: { message: 'Reset password success', success: true },
            type: 'VERIFY_PASSWORD_TOKEN'
          }, {
            payload: {
              id: 'VERIFY_PASSWORD_TOKEN', message: 'new user password created Successfully', timeout: 5000, title: 'Success', type: 'success'
            },
            type: '@ReduxToastr/toastr/ADD'
          }
        ];
        await store.dispatch(verifyTokenPassword('abcde', '123456'))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
            done();
          });
      });
    });

    // User log out
    describe('User log out', () => {
      it('should create a SIGNOUT_USER action', (done) => {
        const expectedActions = [
          { payload: '', type: 'UNAUTH_USER' }
        ];

        store.dispatch(logoutUser());
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        done();
      });
    });
  });
});
