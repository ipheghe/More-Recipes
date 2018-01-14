import React from 'react';
import {
  Switch,
  HashRouter as Router, Route, hashHistory
} from 'react-router-dom';
import {
  Landing,
  Login,
  SignUp,
  Dashboard,
  ViewRecipe,
  Favorite,
  MyRecipe,
  AddRecipe,
  ManageRecipe,
  EditProfile,
  Search,
  ResetPassword
} from '../components';
import RequireAuth from '../auth/RequireAuth.jsx';
import IsToken from '../auth/IsToken.jsx';

const App = () =>
  (
    <Router history={hashHistory}>
      <Switch>
        <Route exact name="app" path="/" component={IsToken(Landing)} />
        <Route path="/signup" component={IsToken(SignUp)} />
        <Route path="/login" component={IsToken(Login)} />
        <Route path="/reset-password/:token" component={ResetPassword} />
        <Route path="/dashboard" component={RequireAuth(Dashboard)} />
        <Route path="/recipes/:id" component={RequireAuth(ViewRecipe)} />
        <Route path="/search" component={RequireAuth(Search)} />
        <Route path="/favorite" component={RequireAuth(Favorite)} />
        <Route path="/myRecipe" component={RequireAuth(MyRecipe)} />
        <Route path="/addRecipe" component={RequireAuth(AddRecipe)} />
        <Route path="/manageRecipe" component={RequireAuth(ManageRecipe)} />
        <Route path="/editProfile" component={RequireAuth(EditProfile)} />
      </Switch>
    </Router>
  );

export default App;
