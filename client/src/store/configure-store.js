import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as localStore from '../localStore';

const initialState = {};
/**
 *
 * @param {object} initialState - default app state
 * @return {*} createStore
 */

const logger = createLogger({
  // options
});
export default function configureStore() {
  return composeWithDevTools(
    applyMiddleware(thunk, logger),
  )(createStore)(rootReducer)
}
