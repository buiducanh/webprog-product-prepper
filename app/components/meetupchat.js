import React from 'react';
import {getOnlineUsers} from '../server';
import InterviewSession from './interviewsession';

export default class MeetupChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {onlineUsers: []};
  }
  refresh() {
    var cb = (onlineUsers) => {
      this.setState({onlineUsers: onlineUsers});
    };
    getOnlineUsers(cb);
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3 online-column">
            <div className="panel online-panel panel-default">
              <div className="panel-heading">
                {this.state.onlineUsers.length} online user
              </div>
              <div className="panel-body online-users">
                <ul>
                  {this.state.onlineUsers.map((user, i) => {
                    return (<li key={i}>
                      {user.fullName} <span className="online glyphicon glyphicon-ok-sign"></span>
                    </li>)
                  })
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9 chat-column">
            <div className="panel online-panel panel-default">
              <div className="panel-heading">
                Connected
              </div>
              <div className="panel-body chat-history">
                <ul className="list-inline">
                  <li className="chat-message">
                    <strong>NEWUSER1</strong>: Hey there NEWUSER2, I like your name
                  </li>
                  <li className="chat-message">
                    <strong>NEWUSER2</strong>: Thanks NEWUSER1, your name  is not too shabby either
                  </li>
                  <li className="chat-message">
                    <strong>NEWUSER1</strong>: shall we get down to business?
                  </li>
                  <li className="chat-message">
                    <strong>NEWUSER2</strong>: what business? ugh, oh, my connection is lagging.
                  </li>
                  <li className="chat-message">
                    <strong>NEWUSER1</strong>: what? are you still here?
                  </li>
                  <li className="chat-message">
                    <strong>NEWUSER1</strong>: hey talk to me
                  </li>
                </ul>
              </div>
              <div className="panel-footer chat-box">
                <div className="input-group">
                    <span className="input-group-addon" id="basic-addon1">@NewUser1</span>
                    <input type="text" className="form-control" placeholder="Chat Message" aria-describedby="basic-addon1"></input>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
    )
  }
}
