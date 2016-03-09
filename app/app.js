import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/homepage.js';
import { IndexRoute, Router, Route, hashHistory } from 'react-router'

/**
 * The primary component in our application.
 * The Router will give it different child Components as the user clicks
 * around the application.
 */
class App extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute user={4} component={HomePage} />
    </Route>
  </Router>
  ), document.getElementById('main-container')
);
