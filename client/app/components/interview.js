import React from 'react';
import VoiceChat from "./voicechat";
import Questions from "./interviewquestions";
import CodeEditor from "./codeeditor";
import {getInterviewSession} from '../server';



export default class Interview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {interview: {
      problem: {
        title: ""
      },
      interviewer: {
        _id: ""
      },
      interviewee: {
        _id: ""
      }
    }};
  }
  refresh() {
    getInterviewSession(this.props.params.interviewId, (interviewData) => {
      this.setState({interview: interviewData});
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div className="component-container">
        <div className="row">
          <div className="col-md-4">
            <VoiceChat />
            <Questions interviewquestion={this.state.interview}/>
          </div>
          <CodeEditor interviewerId={this.state.interview.interviewer._id} intervieweeId={this.state.interview.interviewee._id} interviewId={this.props.params.interviewId} />
        </div>
      </div>


    )
  }
}
