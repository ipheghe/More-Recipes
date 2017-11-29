import React from 'react';
import {
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
} from '../components/index';
import RequireAuth from '../auth/requireAuth';

const App = () =>
  (
    <Router history={hashHistory}>
      <div>
        <Route exact name="app" path="/" component={Landing} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/reset-password/:token" component={ResetPassword} />
        <Route path="/dashboard" component={RequireAuth(Dashboard)} />
        <Route path="/recipes/:id" component={RequireAuth(ViewRecipe)} />
        <Route path="/search" component={RequireAuth(Search)} />
        <Route path="/favorite" component={RequireAuth(Favorite)} />
        <Route path="/myRecipe" component={RequireAuth(MyRecipe)} />
        <Route path="/addRecipe" component={RequireAuth(AddRecipe)} />
        <Route path="/manageRecipe" component={RequireAuth(ManageRecipe)} />
        <Route path="/editProfile" component={RequireAuth(EditProfile)} />
      </div>
    </Router>
  );

export default App;
