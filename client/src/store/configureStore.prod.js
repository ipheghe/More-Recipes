import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

/**
 * @export configureStore
 * @func
 * @returns {*} void
 */
const configureStore = () =>
  composeWithDevTools(applyMiddleware(thunk))(createStore)(rootReducer);


export default configureStore;
