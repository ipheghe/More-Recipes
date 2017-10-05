import { combineReducers } from 'redux';
import usersReducer from './users-reducer';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer,
  form: formReducer,
  toastr: toastrReducer,
});

export default rootReducer;
