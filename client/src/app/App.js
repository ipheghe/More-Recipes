import React from 'react';
import {
  HashRouter as Router, Route, IndexRoute, hashHistory
} from 'react-router-dom';
import {
  Landing,
  Login,
  Register,
  Dashboard,
  ViewRecipe,
  Favorite,
  MyRecipe,
  AddRecipe,
  ManageRecipe,
  EditProfile,
  Search,
  NotFoundPage
} from "../components/index";
import RequireAuth from '../auth/requireAuth';
const NotFoundRoute = Router.NotFoundPage;
const App = () =>
  (
    <Router history={hashHistory}>
      <div>
        <Route exact name='app' path='/' component={Landing} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/recipes/:id' component={ViewRecipe} />
        <Route path='/recipes?sort=params' component={Search} />
        <Route path='/favorite' component={RequireAuth(Favorite)} />
        <Route path='/myRecipe' component={RequireAuth(MyRecipe)} />
        <Route path='/addRecipe' component={AddRecipe} />
        <Route path='/manageRecipe' component={RequireAuth(ManageRecipe)} />
        <Route path='/editProfile' component={RequireAuth(EditProfile)} />
        {/* <Route path="/*" component={NotFoundPage} /> */}
      </div>
    </Router>
  );

export default App;
