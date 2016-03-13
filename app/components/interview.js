import React from 'react';
import VoiceChat from "./voicechat";
import Questions from "./interviewquestions";
import CodeEditor from "./codeeditor";


export default class Interview extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <VoiceChat />
            <Questions />
          </div>
<<<<<<< HEAD
          <CodeEditor />
=======
          <CodeEditor interviewerId={this.props.params.interviewerId} intervieweeId={this.props.params.intervieweeId} />
>>>>>>> b916ea587087a504ebb324d276b193a3c28eaec7
        </div>
      </div>


    )
  }
}
