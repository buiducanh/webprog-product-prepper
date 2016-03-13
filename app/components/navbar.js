import React from 'react';
import {ResetDatabase} from '../database';
import {getUserData, getNotifications} from '../server';
import {Link} from 'react-router';
import UserProfile from './userprofile.js'


export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      users: {languages: [], interview: []}
    };
  }

  refresh() {
    var callbackFunction = (notificationData) => {
      this.setState({ notifications: notificationData });
      console.log(notificationData);
    }
    getUserData(this.props.userId, (userData) => {
      this.setState({users: userData});
    });
    getNotifications(localStorage.getItem("userId"), callbackFunction);
  }

  componentDidMount() {
    while (google === undefined) {};
    this.refresh();
  }

  render() {
    var notifications = this.state.notifications;
    return (
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link to="/">
            <img className="logo" alt="Brand" src="img/pic.png"></img>
          </Link>
        </div>
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <div className="nav navbar-nav navbar-left">
            <span id="db-reset">
              <ResetDatabase />
            </span>

            <Link to={"/match"}>
              <button type="button" className="navbar-btn btn btn-default">
                <span className="glyphicon glyphicon-flash"></span> Interview
              </button>
            </Link>
            <Link to='/meetup'>
              <button type="button" className="navbar-btn btn btn-default">
                <span className="glyphicon glyphicon-globe"></span> Meetup
              </button>
            </Link>
            <div className="btn-group" role="group">
              <button type="button" className="navbar-btn btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                <span className="glyphicon glyphicon-comment"></span> Notifications <span className="badge">{this.state.notifications.length}</span>
              </button>
              <ul className="dropdown-menu meetup">
                {this.state.notifications.map((noti, i) => {
                  var requester = noti.requester;
                  if (i + 1 === this.state.notifications.length) {
                    return (<div key={i}>
                      <li>
                        <div className="media">
                          <div className="media-left">
                            Pic
                          </div>
                          <div className="media-body">
                            Request from {requester.fullName}<span className="pull-right">&nbsp;&nbsp;&nbsp;</span>
        <button className="pull-right btn btn-xs btn-success glyphicon glyphicon-ok"></button> <button className="btn btn-xs btn-danger glyphicon glyphicon-remove pull-right"></button>
                          </div>
                        </div>
                      </li>
                    </div>);
                  }
                  return (<div key={i}>
                    <li>
                      <div className="media">
                        <div className="media-left">
                          Pic
                        </div>
                        <div className="media-body">
                          Request from {requester.fullName}<span className="pull-right">&nbsp;&nbsp;&nbsp;</span>
      <button className="pull-right btn btn-xs btn-success glyphicon glyphicon-ok"></button> <button className="btn btn-xs btn-danger glyphicon glyphicon-remove pull-right"></button>
                        </div>
                      </div>
                    </li>
                    <li role="separator" className="divider"></li>
                  </div>);
                  })
                }
              </ul>
            </div>
          </div>
          <div className="nav navbar-nav navbar-right">
            <div className="btn-toolbar navbar-right" role="toolbar">
              <div className="btn-group" role="group">
                <button type="button" className="navbar-btn btn btn-default">
                  PIC
                </button>
              </div>
              <div className="btn-group" role="group">
                <button type="button" className="navbar-btn btn btn-default dropdown-toggle" data-toggle="dropdown">
                  {this.state.users.fullName}
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link to={"/meetupchat/" + localStorage.getItem("userId")}>
                      <a href="#">Meetup chat</a>
                    </Link>
                  </li>
                  <li>
                    <Link to={"/userprofile/" + localStorage.getItem("userId") } >Profile</Link>
                  </li>
                  <li>
                    <a href="#">Log out</a>
                  </li>
                </ul>
              </div>
            </div>
            <form className="navbar-form navbar-right" role="search">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search candidates"></input>
                <span className="input-group-btn">
                  <Link to="/peopleprofile">
                    <button type="submit" className="btn btn-default">
                      <span className="glyphicon glyphicon-search"></span>
                    </button>
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
