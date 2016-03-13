import React from 'react';


export default class Questions extends React.Component {
  render() {
    return (
          <div className="panel panel-default">
            <div className="panel-heading">
              Interview Question
              <textarea rows="15" cols="43">
                {this.props.children}
              </textarea>
            </div>
          </div>
      )
    }
  }
