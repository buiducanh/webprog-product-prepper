import React from 'react';
import VoiceChat from "./voicechat";
import Questions from "./interviewquestions";
import CodeEditor from "./codeeditor";
import {getInterviewSession} from '../server';



export default class Interview extends React.Component {
  constructor(props) {
    super(props);
    this.video = true;
    this.muted = true;
    this.volume = 1;
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

  onVolume(e) {
    e.preventDefault();
    this.volume = (this.volume === 0) ? 1 : 0;
    console.log("toggle volume" + this.volume);
    this.webrtc.setVolumeForAll(this.volume);
  }

  onMicro(e) {
    e.preventDefault();
    this.muted = (this.muted) ? false : true;
    console.log("toggle micro" + this.muted);
    if (this.muted) {
      this.webrtc.mute();
    }
    else {
      this.webrtc.unmute();
    }
  }

  onVideo(e) {
    e.preventDefault();
    this.video = (this.video) ? false : true;
    console.log("toggle video " + this.video);
    if (this.video) {
      this.webrtc.resumeVideo();
    }
    else {
      this.webrtc.pauseVideo();
    }
  }

  render() {
    this.webrtc = new SimpleWebRTC({
      // the id/element dom element that will hold "our" video
      localVideoEl: 'localVideo',
      // the id/element dom element that will hold remote videos
      remoteVideosEl: 'remotesVideos',
      // immediately ask for camera access
      autoRequestMedia: true,
      media: { video: true, audio: true},
      url: 'http://project-webrtc.herokuapp.com'
    });
    // we have to wait until it's ready
    this.webrtc.on('readyToCall', function () {
      // you can name it anything
      this.webrtc.joinRoom('your awesome room name');
    }.bind(this));
    return (
      <div className="component-container">
        <div className="row">
          <div className="col-md-4">
            <VoiceChat onVolume={(e) => this.onVolume(e)} onVideo={(e) => this.onVideo(e)} onMicro={(e) => this.onMicro(e)}></VoiceChat>
            <video height="200" id="localVideo"></video>
            <div className="remotesVideos" ref={(ref) => this.remotes = ref} id="remotesVideos"></div>
            <Questions interviewquestion={this.state.interview}/>
          </div>
          <CodeEditor interviewerId={this.state.interview.interviewer._id} intervieweeId={this.state.interview.interviewee._id} interviewId={this.props.params.interviewId} />
        </div>
      </div>
    )
  }

  componentWillUnmount() {
    this.webrtc.stopLocalVideo();
    this.webrtc.leaveRoom();
    this.webrtc.disconnect();
  }
}
