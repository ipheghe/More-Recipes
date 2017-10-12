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
        <Route path='/recipes/:id' component={ ViewRecipe }/>
        <Route path='/favorite' component={ RequireAuth(Favorite) }/>
        <Route path='/myRecipe' component={ RequireAuth(MyRecipe) }/>
        <Route path='/addRecipe' component={ RequireAuth(AddRecipe) }/>
        <Route path='/manageRecipe' component={ RequireAuth(ManageRecipe) }/>
        <Route path='/editProfile' component={ RequireAuth(EditProfile) }/>
      </div>
    </Router>
  );

export default App;
