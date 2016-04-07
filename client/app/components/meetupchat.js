import React from 'react';
import {deleteChatMember, postChatMessage, getOnlineUsers, getChatSessions} from '../server';
import InterviewSession from './interviewsession';
import _ from 'lodash';
import ChatHistory from './chathistory';

export default class MeetupChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        fullName: ""
      },
      onlineUsers: [], 
      chatSessions: {
        chatMessages: [],
        memberLists: [],
        initiator: {
          _id: ""
        }
      },
      value: ""
    };
  }

  refresh() {
    var onlineUsersCallback = (onlineUsers) => {
      var currentUser = _.find(onlineUsers, (user) => {
        return parseInt(user._id, 10) === parseInt(localStorage.getItem('userId'), 10);
      });
      this.setState({
        onlineUsers: onlineUsers,
        currentUser: currentUser
      });
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

  handleEditMemberButton(e, userId) {
    e.preventDefault();
    deleteChatMember(this.state.chatSessions._id, userId, (chatSession) => {
      this.setState({chatSessions: chatSession});
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    var stateChatId = parseInt(this.state.chatSessions._id, 10);
    var propsChatId = parseInt(this.props.params.id, 10);
    if (stateChatId !== propsChatId) {
      this.refresh();
      return (
        <div></div>
      )
    }
    function currentUserPredicate(member) {
      return Number(localStorage.getItem('userId')) === member._id;
    }
    this.state.chatSessions.memberLists = _.reject(this.state.chatSessions.memberLists, currentUserPredicate);
    var partitionedUsers = _.partition(this.state.chatSessions.memberLists, (user) => { 
      return _.find(this.state.onlineUsers, (onlUser) => { return user._id == onlUser._id; });
    });
    var onlineUsers = partitionedUsers[0];
    var offlineUsers = partitionedUsers[1];
    var currentUserId = parseInt(localStorage.getItem('userId'), 10);
    var initiatorId = parseInt(this.state.chatSessions.initiator._id, 10);
    if (currentUserId == initiatorId) {
      var editMember = (
        <div className="btn-group pull-right member-edit" role="group">
          <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
            Edit Members
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            {this.state.chatSessions.memberLists.map((user, i) => {
              if (i + 1 === this.state.chatSessions.memberLists.length) {
                return (<div key={i}>
                  <li>
                    <div className="media">
                      <div className="media-left">
                        Pic
                      </div>
                      <div className="media-body">
                        {user.fullName}<span className="pull-right">&nbsp;&nbsp;&nbsp;</span>
                        <button className="btn btn-xs btn-danger glyphicon glyphicon-remove pull-right" onClick={(e) => this.handleEditMemberButton(e, user._id)}></button>
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
                      {user.fullName}<span className="pull-right">&nbsp;&nbsp;&nbsp;</span>
                      <button className="btn btn-xs btn-danger glyphicon glyphicon-remove pull-right" onClick={(e) => this.handleEditMemberButton(e, user._id)}></button>
                    </div>
                  </div>
                </li>
                <li role="separator" className="divider"></li>
              </div>);
              })
            }
          </ul>
        </div>
      )
    }
    else {
      var editMember = (
        <div className="btn-group pull-right member-edit" role="group">
          <button type="button" disabled="disabled" className="btn btn-default">
            Edit Members
            <span className="caret"></span>
          </button>
        </div>
      )
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3 online-column">
            <div className="panel online-panel panel-default">
              <div className="panel-heading online-count">
                <h4 className="panel-title pull-left">{onlineUsers.length} online user</h4>
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
              <div className="panel-heading clearfix">
                {editMember}
                <h4 className="panel-title pull-left">Connected</h4>
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
                    <span className="input-group-addon" id="basic-addon1">@{this.state.currentUser.fullName}</span>
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
