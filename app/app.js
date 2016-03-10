import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/homepage.js';
import Matching from './components/matching.js';
import Navbar from './components/navbar.js';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';

/**
 * The primary component in our application.
 * The Router will give it different child Components as the user clicks
 * around the application.
 */
class App extends React.Component {
  render() {
    return (
      <div>
        <nav id="navbar-container" className="navbar navbar-fixed-top navbar-default">
          <Navbar />
        </nav>
        {this.props.children}
      </div>
    );
  }
}

class MatchingPage extends React.Component {
  render() {
    return <Matching/>;
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="match" component={MatchingPage} />
      <IndexRoute user={4} component={HomePage} />
    </Route>
  </Router>
  ), document.getElementById('main-container')
);
