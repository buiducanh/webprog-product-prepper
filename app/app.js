import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/homepage.js';
import Interview from './components/interview.js';
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

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute user={4} component={HomePage} />
      <Route path="match" component={Matching} />
      <Route path="interview" component={Interview} />
    </Route>
  </Router>
  ), document.getElementById('main-container')
);
