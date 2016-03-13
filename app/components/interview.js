import React from 'react';
import VoiceChat from "./voicechat";
import Questions from "./questions";
import Answers from "./answers";

export default class Interview extends React.Component {
  render() {
    return (
      <div className='row'>
        <div className="col-md-4">
        <VoiceChat />
        <Questions />
        </div>
        <Answers />
      </div>
    )
  }
}
