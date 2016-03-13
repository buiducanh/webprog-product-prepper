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
                        <a key = {i} href="#"><li style={selectedStyle} className="mock-list-element"> {unixTimeToString(interview.feedback.timestamp)} </li> </a>
                      );
                    else
                      return (
                        <a key = {i} href="#"><li className="mock-list-element"> {unixTimeToString(interview.feedback.timestamp)} </li> </a>
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
