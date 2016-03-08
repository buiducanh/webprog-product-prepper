import React from 'react';
import {getInterviewData} from '../server.js';

export default class HomePage extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3">
        </div>
        <div className="col-md-6">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="row">
                <div className="col-md-6">
                  <ul className="interview-list list-inline">
                    <li className="small-text">
                      12 hrs ago
                    </li>
                    <li>
                      <div className="media">
                        <div className="media-left media-top">
                          PIC
                        </div>
                        <div className="media-body">
                          <a href="#">prep_buddy</a>
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
                    <h4>Interview Question</h4>
                    Question content
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
                    <span className="interview-info">45 minutes</span><br></br>
                    <span className="interview-info">Hard</span><br></br>
                    <span className="interview-info">Interviewee</span>
                  </div>
                  <div className="col-md-4">
                    <h3 className="pull-right"><span className="label label-success">Success</span></h3>
                  </div>
                </div>
              </div>
            </div> 
            <div className="panel-footer">
              <div className="row">
                <div className="col-md-12">
                  Feedback from the other 
                  <ul className="list-inline pull-right">
                    <li>
                      <a href="#">
                        <span className="glyphicon glyphicon-star"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="glyphicon glyphicon-star"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="glyphicon glyphicon-star"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="glyphicon glyphicon-star"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="glyphicon glyphicon-star"></span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> 
          </div> 
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="row">
                <div className="col-md-6">
                  <ul className="interview-list list-inline">
                    <li className="small-text">
                      May 16 2016
                    </li>
                    <li>
                      <div className="media">
                        <div className="media-left media-top">
                          PIC
                        </div>
                        <div className="media-body">
                          <a href="#">prep_buddy</a>
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
                    <h4>Interview Question</h4>
                    Question content
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
                    <span className="interview-info">45 minutes</span><br></br>
                    <span className="interview-info">Hard</span><br></br>
                    <span className="interview-info">Interviewer</span>
                  </div>
                  <div className="col-md-4">
                    <h3 className="pull-right"><span className="label label-info">Great work</span></h3>
                  </div>
                </div>
              </div>
            </div> 
            <div className="panel-footer">
              <div className="row">
                <div className="col-md-12">
                  Feedback from the other 
                  <ul className="list-inline pull-right">
                    <li>
                      <a href="#">
                        <span className="glyphicon glyphicon-star"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="glyphicon glyphicon-star"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="glyphicon glyphicon-star"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="glyphicon glyphicon-star"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="glyphicon glyphicon-star"></span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> 
          </div> 
        </div> 
      </div>
    )
  }
}
