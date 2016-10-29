import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, hashHistory} from 'react-router';
import Login from './login/Login';
import TaskList from './task/TaskList';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Login}/>
    <Route path="/tasks" component={TaskList}/>
  </Router>,
  document.getElementById('container')
);
