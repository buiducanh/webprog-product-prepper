import React from 'react';
import PastInterviewsList from "./pastinterviewslist";

export default class History extends React.Component {
  render() {
    return (
      <div className="history container">
        <div className="row">
          <PastInterviewsList user={this.props.route.user}/>
        </div>
      </div>
    )
  }
}
