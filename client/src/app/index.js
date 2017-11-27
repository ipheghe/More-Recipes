import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import App from './App';
import configureStore from '../store/configure-store';
import '../../public/style.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import { AUTH_USER } from '../actions/types';


const store = configureStore({});
const app = document.getElementById('app');
const token = window.localStorage.getItem('token');

if (token) {
  // Update application state. User has token and is probably authenticated
  store.dispatch({ type: AUTH_USER });
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

