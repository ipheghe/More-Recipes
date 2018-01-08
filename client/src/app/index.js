import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import 'font-awesome-sass-loader';
import App from './App.jsx';
import configureStore from '../store';
import '../../public/style.scss';
import { AUTH_USER } from '../actions/types';
import { logoutUser } from '../actions/authActions';
import decodeToken from '../helpers/decodeToken';

const store = configureStore({});
const app = document.getElementById('app');
const token = window.localStorage.getItem('token');

if (token) {
  const decodedToken = decodeToken(token);
  if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
    // log user out
    store.dispatch(logoutUser());
  } else {
    // add user data and token to auth store
    store.dispatch({ type: AUTH_USER });
  }
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

