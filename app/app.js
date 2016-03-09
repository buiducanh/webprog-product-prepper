import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/homepage.js';
import Matching from './components/matching.js'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'

/**
 * The primary component in our application.
 * The Router will give it different child Components as the user clicks
 * around the application.
 */
class App extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

class MatchingPage extends React.Component {
  render() {
    return <Matching/>;
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="match" component={MatchingPage} />
    </Route>
  </Router>
  ), document.getElementById('main-container')
);
