import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../store/configure-store';
import { Provider } from 'react-redux';
import rootReducer from '../reducers';
import App from './App';
import '../../public/style.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 
import * as localStore from '../localStore';
import cookie from 'react-cookies';  
import { AUTH_USER } from '../actions/actionTypes';
import { BrowserRouter } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr'


const store = configureStore({});
const app = document.getElementById('app');
const token = sessionStorage.getItem('token');

if (token) {
  // Update application state. User has token and is probably authenticated
  store.dispatch({ type: AUTH_USER });
}
ReactDOM.render(
  <Provider store={ store }>
        <div>
            <BrowserRouter><App /></BrowserRouter>
              <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates
                position="top-left"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar/>
        </div>
  </Provider>, app);


