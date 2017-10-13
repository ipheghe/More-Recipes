import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import recipeReducer from './recipeReducer';
import reviewReducer from './reviewReducer';
import voteReducer from './voteReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  recipe: recipeReducer,
  review: reviewReducer,
  vote: voteReducer,
  form: formReducer,
  toastr: toastrReducer,
});

export default rootReducer;
