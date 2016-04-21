import React from 'react';
import {ResetDatabase} from '../resetdatabase';
import {deleteNotification, addChatMember, deleteChatMember, updateNotificationStatus, getUserData, getNotifications} from '../server';
import {Link} from 'react-router';
import UserProfile from './userprofile.js'
import Notification from './notification.js'


export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      users: {languages: [], interview: []},
      value: ""
    };
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ value: e.target.value });
  }

  onNoClick(e, notificationId, userId) {
    e.preventDefault();
    var notiCallback = (notification) => {
      var chatSessionId = notification.chatSession._id;
      deleteChatMember(chatSessionId, userId, function(){});
    }
    var notifications = _.reject(this.state.notifications, (noti) => { return Number(noti._id) === notificationId });
    deleteNotification(notificationId, notiCallback);
    this.setState({notifications: notifications});
  }

  onOkClick(e, notificationId, userId) {
    e.preventDefault();
    var notiCallback = (notification) => {
      var chatSessionId = notification.chatSession._id;
      var indexOfNoti = _.findIndex(this.state.notifications, (noti) => { return Number(noti._id) === notificationId; });
      this.state.notifications[indexOfNoti] = notification;
      this.setState(this.state);
      addChatMember(chatSessionId, userId, function(){});
    }
    updateNotificationStatus(notificationId, 'ongoing', notiCallback);
  }

  handleKeyUp(e) {
    e.preventDefault();
    if (e.key === "Enter") {
      var searchTerm = this.state.value.trim();
      if (searchTerm !== "") {
        this.setState({ value: "" });
      }
    }
  }

  refresh() {
    var callbackFunction = (notificationData) => {
      this.setState({ notifications: notificationData });
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
      <div className="component-container">
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
                    return (<Notification key={i} chatSession={noti.chatSession} status={noti.status} i={noti._id} requester={requester} onNoClick={this.onNoClick.bind(this)} onOkClick={this.onOkClick.bind(this)}/>);
                  }
                  return (
                    <Notification key={i} i={noti._id} chatSession={noti.chatSession} status={noti.status} requester={requester} onNoClick={this.onNoClick.bind(this)} onOkClick={this.onOkClick.bind(this)}>
                      <li role="separator" className="divider"></li>
                    </Notification>);
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
                    <Link to={"/meetupchat/" + 1}>
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
                <input type="text" className="form-control" placeholder="Search candidates"
                  value={this.state.value} onChange={(e) => this.handleChange(e)}
                  onKeyUp={(e) => this.handleKeyUp(e)} ></input>
                <span className="input-group-btn">
                  <Link to={{pathname: '/searchpeople', query: {searchTerm: this.state.value}}} >
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
