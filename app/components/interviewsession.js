import React from 'react';
import {unixTimeToString} from '../util';
import _ from 'lodash';

export default class InterviewSession extends React.Component {
  otherRole(role) {
    if (role === 'interviewer') return 'interviewee';
    return 'interviewer';
  }
  render() {
    var data = this.props.interviewsession;
    var myRole = '';
    if (data.interviewer._id === this.props.user) {
      myRole = 'interviewer';
    }
    else {
      myRole = 'interviewee';
    }
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row">
            <div className="col-md-6">
              <ul className="interview-list list-inline">
                <li className="small-text">
                  {unixTimeToString(data.timestamp)}
                </li>
                <li>
                  <div className="media">
                    <div className="media-left media-top">
                      PIC
                    </div>
                    <div className="media-body">
                      <a href="#">{data[this.otherRole(myRole)].fullName}</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div> 
            <div className="col-md-6">
              <button type="button" className="btn btn-default pull-right glyphicon glyphicon-new-window"></button>
            </div> 
          </div> 
          <div className="row">
            <div className="col-md-12">
              <div className="well well-sm">
                <h4>{data.problem.title}</h4>
                {data.problem.question}
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-1">
                <span className="label label-default">Duration</span><br></br>
                <span className="label label-default">Class</span><br></br>
                <span className="label label-default">Role</span>
              </div>
              <div className="col-md-7">
                <span className="interview-info">{data.duration}</span><br></br>
                <span className="interview-info">{data.problem.difficulty}</span><br></br>
                <span className="interview-info">{myRole}</span>
              </div>
              <div className="col-md-4">
                <h3 className="pull-right"><span className="label label-success">{data.result}</span></h3>
              </div>
            </div>
          </div>
        </div> 
        <div className="panel-footer">
          <div className="row">
            <div className="col-md-12">
              {data.feedback[this.otherRole(myRole) + "_comment"]}
              <ul className="list-inline pull-right">
                {
                  _.times(data.feedback[this.otherRole(myRole) + "_rating"], (i) => 
                    <li key={i}>
                      <a href="#">
                        <span className="glyphicon glyphicon-star"></span>
                      </a>
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
        </div> 
      </div> 
    )
  }
}

