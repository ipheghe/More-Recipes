import React from 'react';
import { Switch, HashRouter as Router, hashHistory, Route } from 'react-router-dom';
import {
  Landing,
  Login,
  SignUp,
  Dashboard,
  ViewRecipe,
  EditProfile,
  ResetPassword,
  NotFoundPage
} from '../components';
import { NavHeader, Footer } from '../commonViews';
import RequireAuth from '../auth/RequireAuth.jsx';

const App = () =>
  (
    <Router history={hashHistory} >
      <div>
        <NavHeader />
        <Switch>
          <Route exact name="app" path="/" component={Landing} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/reset-password/:token" component={ResetPassword} />
          <Route exact path="/recipes/:id" component={RequireAuth(ViewRecipe)} />
          <Route exact path="/editProfile" component={RequireAuth(EditProfile)} />
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="*" component={NotFoundPage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );

export default App;
