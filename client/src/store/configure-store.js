import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const logger = createLogger({
  // options
});

/**
 * @export configureStore
 * @func
 * @returns {*} void
 */
const configureStore = () => {
  if (process.env.NODE_ENV === 'production') {
    return composeWithDevTools(applyMiddleware(thunk))(createStore)(rootReducer);
  }
  return composeWithDevTools(applyMiddleware(thunk, logger))(createStore)(rootReducer);
};


export default configureStore;
