import React from 'react';
import PastInterviewsList from "./pastinterviewslist";
import InterviewFeedback from "./interviewfeedback";

export default class History extends React.Component {
  render() {
    return (
      <div className="history container">
        <div className="row">
          <PastInterviewsList/>
          <InterviewFeedback/>
        </div>
      </div>
    )
  }
}
