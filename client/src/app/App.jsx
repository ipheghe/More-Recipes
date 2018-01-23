import React from 'react';
import {
  Switch,
  HashRouter as Router,
  hashHistory,
  Route
} from 'react-router-dom';
import {
  Landing,
  Login,
  Signup,
  Dashboard,
  ViewRecipe,
  EditProfile,
  ResetPassword,
  NotFound
} from '../components';
import { NavHeader, Footer } from '../commonViews';
import RequireAuth from '../auth/RequireAuth';

/**
 * @description main app node
 *
 * @return {ReactElement} markup
 */
const App = () =>
  (
    <Router history={hashHistory} >
      <div>
        <NavHeader />
        <Switch>
          <Route exact name="app" path="/" component={Landing} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/reset-password/:token"
            component={ResetPassword}
          />
          <Route
            exact
            path="/recipes/:id"
            component={RequireAuth(ViewRecipe)}
          />
          <Route
            exact
            path="/edit-profile"
            component={RequireAuth(EditProfile)}
          />
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="*" component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );

export default App;
