import React from 'react';
import {
  HashRouter as Router, Route, IndexRoute, hashHistory
} from 'react-router-dom';
import { Landing, Login, Register, Dashboard, ViewRecipe, Favorite, MyRecipe, AddRecipe, ManageRecipe, EditProfile, NotFoundPage } from "../components/index";
import RequireAuth from '../auth/requireAuth';
const App = () =>
  (
    <Router history = { hashHistory }>
      <div>
        <Route exact path='/' component={ Landing }/>
        <Route path='/register' component={ Register }/>
        <Route path='/login' component={ Login }/>
        <Route path='/dashboard' component={ Dashboard } />  
        <Route path='/ViewRecipe' component={ ViewRecipe }/>
        <Route path='/favorite' component={ Favorite }/>
        <Route path='/myRecipe' component={ MyRecipe }/>
        <Route path='/addRecipe' component={ AddRecipe }/>
        <Route path='/manageRecipe' component={ ManageRecipe }/>
        <Route path='/editProfile' component={ EditProfile }/>
      </div>
    </Router>
  );

export default App;
