import React from 'react';



export default class VoiceChat extends React.Component {
  render() {
    return (

            <div className="panel panel-default">
              <div className="panel-heading text-center">
                <button type="button" className="navbar-btn btn btn-default pull-left">
                  <span className="glyphicon glyphicon-earphone" style={{color: 'red'}}></span>
                </button>
                <button type="button" className="navbar-btn btn btn-default">
                  <span className="glyphicon glyphicon-record"></span>
                </button>
                <button type="button" className="navbar-btn btn btn-default pull-right">
                  <span className="glyphicon glyphicon-volume-up"></span>
                </button>
              </div>
            </div>

      )
    }
  }
