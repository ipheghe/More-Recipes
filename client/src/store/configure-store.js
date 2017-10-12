import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import * as localStore from '../localStore';

const initialState = {};
/**
 *
 * @param {object} initialState - default app state
 * @return {*} createStore
 */
export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
}
