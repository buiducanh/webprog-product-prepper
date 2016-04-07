import React from 'react';
import {Link} from 'react-router';


export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    var requester = this.props.requester;
    if (this.props.status === "waiting") {
      var okOrChatButton = (<button className="pull-right btn btn-xs btn-success glyphicon glyphicon-ok" onClick={(e) => this.props.onOkClick(e, this.props.i, localStorage.getItem('userId'))}></button>)
    }
    else {
      var okOrChatButton =( 
        <Link to={"/meetupchat/" + this.props.chatSession._id}>
          <button className="pull-right btn btn-xs btn-success glyphicon glyphicon-comment"></button>
        </Link>
      )
    }
    return (
      <div>
        <li>
          <div className="media">
            <div className="media-left">
              Pic
            </div>
            <div className="media-body">
              Request from {requester.fullName}<span className="pull-right">&nbsp;&nbsp;&nbsp;</span>
              {okOrChatButton}
              <button className="btn btn-xs btn-danger glyphicon glyphicon-remove pull-right" onClick={(e) => this.props.onNoClick(e, this.props.i, localStorage.getItem('userId'))}></button>
            </div>
          </div>
        </li>
        {this.props.children}
      </div>
    )
  }
}
