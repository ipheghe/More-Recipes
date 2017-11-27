import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import App from './App';
import configureStore from '../store/configure-store';
import '../../public/style.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import { AUTH_USER } from '../actions/types';
import { logoutUser } from '../actions/auth';
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

