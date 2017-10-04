import { combineReducers } from 'redux';
import usersReducer from './users-reducer';
import userReducer from './user_reducer';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';
import signuserin from './signinReducer';
import session from './sessionReducer';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  users: usersReducer,
  signuserin,
  session,
  auth: authReducer,
  form: formReducer,
  user: userReducer,
  toastr: toastrReducer
});

export default rootReducer;
