import React from 'react';
import InterviewFeedback from "./interviewfeedback";
import {getInterviewData} from '../server'
import {unixTimeToString} from '../util'
export default class PastInterviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {interview: [],selected: null};
  }
  refresh() {
    getInterviewData(this.props.user, (interviewData) => {
      this.setState({interview: interviewData,selected:interviewData[0]});
    });
  }
  componentDidMount() {
    this.refresh();
  }
  handleInterviewClick(clickEvent, clickedInterview) {
    // Stop the event from propagating up the DOM tree, since we handle it here.
    // Also prevents the link click from causing the page to scroll to the top.
    clickEvent.preventDefault();
    // 0 represents the 'main mouse button' -- typically a left click
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
    if (clickEvent.button === 0) {
      // Callback function for both the like and unlike cases.
        // setState will overwrite the 'likeCounter' field on the current
        // state, and will keep the other fields in-tact.
        // This is called a shallow merge:
        // https://facebook.github.io/react/docs/component-api.html#setstate
      this.setState({selected: clickedInterview});
    }
  }
  render() {
    var selectedStyle = {"listStyleType":"disc","fontWeight": "bold"};
    return (
      <div>
        <div className="col-md-4">
          <div className="panel panel-default">
            <div className="panel-heading">
              <div className="row part-header">Your past mock interview</div>
              <hr style={{"marginTop": "2px","marginBottom": "2px","borderTop": "1px solid gray"}}></hr>
              <ul className="mock-list">
                {
                  this.state.interview.map((interview, i) => {
                    // i is comment's index in comments array
                    if (interview._id==this.state.selected._id)
                      return (
                        <a key = {i} href="#" onClick={(e) => this.handleInterviewClick(e,interview)}><li style={selectedStyle} className="mock-list-element"> {unixTimeToString(interview.feedback.timestamp)} </li> </a>
                      );
                    else
                      return (
                        <a key = {i} href="#" onClick={(e) => this.handleInterviewClick(e,interview)}><li className="mock-list-element"> {unixTimeToString(interview.feedback.timestamp)} </li> </a>
                      );
                  })
                }
              </ul>
            </div>
          </div>
        </div>
        <InterviewFeedback data={this.state.selected} />
      </div>
    )
  }
}
