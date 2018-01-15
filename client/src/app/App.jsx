import React from 'react';
import { Switch, HashRouter as Router, hashHistory, Route } from 'react-router-dom';
import {
  ConnectedLanding,
  ConnectedLogin,
  ConnectedSignUp,
  ConnectedDashboard,
  ConnectedViewRecipe,
  ConnectedEditProfile,
  ConnectedResetPassword,
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
          <Route exact name="app" path="/" component={ConnectedLanding} />
          <Route exact path="/signup" component={ConnectedSignUp} />
          <Route exact path="/login" component={ConnectedLogin} />
          <Route exact path="/reset-password/:token" component={ConnectedResetPassword} />
          <Route exact path="/recipes/:id" component={RequireAuth(ConnectedViewRecipe)} />
          <Route exact path="/editProfile" component={RequireAuth(ConnectedEditProfile)} />
          <Route path="/dashboard" component={ConnectedDashboard} />
          <Route exact path="*" component={NotFoundPage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );

export default App;
