import React from 'react';
import ReactDOM from 'react-dom';

export default class ChatHistory extends React.Component {
  componentWillUpdate() {
    var node = ReactDOM.findDOMNode(this);
    this.shouldScrollBottom = node.scrollTop + node.clientHeight === node.scrollHeight;
  }
   
  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      var node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight
    }
  }

  render() {
    return (
      <div className="panel-body chat-history">
        {this.props.children}
      </div>
    )
  }
}
