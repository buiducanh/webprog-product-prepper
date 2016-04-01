import React from 'react';
import {postChatMessage, getOnlineUsers, getChatSessions} from '../server';
import InterviewSession from './interviewsession';
import _ from 'lodash';
import ChatHistory from './chathistory';

export default class MeetupChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineUsers: [], 
      chatSessions: {
        chatMessages: [],
        initiator: {}
      },
      value: ""
    };
  }

  refresh() {
    var onlineUsersCallback = (onlineUsers) => {
      this.setState({onlineUsers: onlineUsers});
    };
    var chatSessionsCallback = (session) => {
      this.setState({chatSessions: session});
    };
    getOnlineUsers(onlineUsersCallback);
    getChatSessions(this.props.params.id, chatSessionsCallback);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleKeyUp(e) {
    if (e.key === "Enter") {
      var comment = this.state.value.trim();
      var postChatCallback = (message) => {
        this.state.chatSessions.chatMessages.push(message);
        this.setState(this.state);
      };
      if (comment !== "") {
        // Post comment
        postChatMessage(this.state.value, this.props.params.id, localStorage.getItem('userId'), postChatCallback);
        this.setState({value: ""});
      }
    }
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    var partitionedUsers = _.partition(this.state.chatSessions.memberLists, (user) => { 
      return _.find(this.state.onlineUsers, (onlUser) => { return user._id == onlUser._id; }) 
    });
    var onlineUsers = partitionedUsers[0];
    var offlineUsers = partitionedUsers[1];
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3 online-column">
            <div className="panel online-panel panel-default">
              <div className="panel-heading">
                {onlineUsers.length} online user
              </div>
              <div className="panel-body online-users">
                <ul>
                  {onlineUsers.map((user, i) => {
                    return (<li key={i}>
                      {user.fullName} <span className="online glyphicon glyphicon-ok-sign"></span>
                    </li>)
                  })
                  }
                </ul>
                <ul>
                  {offlineUsers.map((user, i) => {
                    return (<li key={i}>
                      {user.fullName} <span className="offline glyphicon glyphicon-remove-sign"></span>
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
              <ChatHistory>
                <ul className="list-inline">
                  {this.state.chatSessions.chatMessages.map((message, i) => {
                    return (<li key={i} className="chat-message">
                      <strong>{message.owner.fullName}</strong>: {message.content}
                    </li>)
                  })
                  }
                </ul>
              </ChatHistory>
              <div className="panel-footer chat-box">
                <div className="input-group">
                    <span className="input-group-addon" id="basic-addon1">@{this.state.chatSessions.initiator.fullName}</span>
                    <input type="text" className="form-control" placeholder="Chat Message" aria-describedby="basic-addon1" value={this.state.value} onChange={(e) => this.handleChange(e)} onKeyUp={(e) => this.handleKeyUp(e)}></input>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
    )
  }
}
