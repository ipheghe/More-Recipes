import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import 'font-awesome-sass-loader';
import App from './App';
import configureStore from '../store';
import '../../public/style.scss';
import { UNAUTH_USER, AUTH_USER } from '../actions/types';
import { logoutUser } from '../actions/authActions';
import decodeToken from '../helpers/decodeToken';

const store = configureStore({});
const app = document.getElementById('app');
const token = window.localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_USER });
  const decodedToken = decodeToken(token);
  if (decodedToken === 'Invalid Token'
  || decodedToken.exp < Math.floor(Date.now() / 1000)) {
    // log user out
    store.dispatch(logoutUser());
  }
} else {
  store.dispatch({ type: UNAUTH_USER });
}

ReactDOM.render(<Provider store={store}>
  <div>
    <App />
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      preventOpenDuplicates
      position="top-left"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
    />
  </div>
                </Provider>, app);

