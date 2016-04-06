import React from 'react';
import VoiceChat from "./voicechat";
import Questions from "./interviewquestions";
import CodeEditor from "./codeeditor";
import {getInterviewData} from '../server';



export default class Interview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {interview: []};
  }
  refresh() {
    getInterviewData(this.props.params.interviewId, (interviewData) => {
      this.setState({interview: interviewData});
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <VoiceChat />
              {
                this.state.interview.map((interview, i) => {
                 return (<Questions key={i} interviewquestion={interview}/>);
                })
              }
          </div>
          <CodeEditor interviewerId={this.props.params.interviewerId} intervieweeId={this.props.params.intervieweeId} interviewId={this.props.params.interviewId} />
        </div>
      </div>


    )
  }
}
