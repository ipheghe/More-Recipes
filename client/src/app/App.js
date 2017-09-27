import React from 'react';
//import { Switch, Route } from 'react-router-dom';
import {
  HashRouter as Router, Route, IndexRoute, hashHistory
} from 'react-router-dom';
import { Landing, Login, Register } from "../components/index";

const App = () =>
  (
    <Router history = { hashHistory }>
      <div>
        <Route exact path='/' component={ Landing }/>
        <Route path='/register' component={ Register }/>
        <Route path='/login' component={ Login }/>
      </div>
    </Router>
  );

export default App;
