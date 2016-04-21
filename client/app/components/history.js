import React from 'react';
import PastInterviewsList from "./pastinterviewslist";

export default class History extends React.Component {
  render() {
    return (
      <div className="history component-container">
        <div className="row">
          <PastInterviewsList user={this.props.params.userId}/>
        </div>
      </div>
    )
  }
}
