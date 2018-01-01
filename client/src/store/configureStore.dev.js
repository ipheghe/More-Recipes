import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const logger = createLogger({});

/**
 * @export configureStore
 * @func
 * @returns {*} void
 */
const configureStore = () => composeWithDevTools(applyMiddleware(thunk, logger))(createStore)(rootReducer);

export default configureStore;
