import React from 'react';
import VoiceChat from "./voicechat";
import Questions from "./interviewquestion";
import CodeEditor from "./codeeditor";


export default class Interview extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row">
            <div className="col-md-4">

              <VoiceChat />
              <Questions user={this.props.params.userId}/>

            </div>
          <CodeEditor interviewerId={this.props.params.interviewerId} intervieweeId={this.props.params.intervieweeId} />
        </div>
      </div>

    )
  }
}
