import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './components/homepage.js';
import Interview from './components/interview.js';
import Matching from './components/matching.js';
import Navbar from './components/navbar.js';
import UserProfile from './components/userprofile.js';

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
localStorage.setItem("userId", 4);

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute user={localStorage.getItem("userId")} component={HomePage} />
      <Route path="match" component={MatchingPage} />
      <Route path="interview" component={Interview} />
      <Route path="userprofile/:id" component={UserProfile} />
    </Route>
  </Router>
  ), document.getElementById('main-container')
);
