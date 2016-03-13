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
          <CodeEditor />
        </div>
      </div>


    )
  }
}
