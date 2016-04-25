import React from 'react';



export default class VoiceChat extends React.Component {
  render() {
    return (

            <div className="panel panel-default">
              <div className="panel-heading text-center">
                <button type="button" className="btn btn-default pull-left" onClick={(e) => this.props.onVolume(e)}>
                  <span className="glyphicon glyphicon-volume-off" style={{color: 'red'}}></span>
                </button>
                <button type="button" className="btn btn-default" onClick={(e) => this.props.onVideo(e)}>
                  <span className="glyphicon glyphicon-facetime-video"></span>
                </button>
                <button type="button" className="btn btn-default pull-right" onClick={(e) => this.props.onMicro(e)}>
                  <span className="glyphicon glyphicon-bullhorn"></span>
                </button>
              </div>
            </div>

      )
    }
  }
