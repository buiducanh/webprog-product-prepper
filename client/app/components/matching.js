import React from 'react';
import {Link, hashHistory} from 'react-router';
import {postInterviewSession} from '../server';

export default class Matching extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        language: "",
        goal: undefined,
        exp: undefined,
      };
    }

  handleMatching(e) {
      // Prevent the event from "bubbling" up the DOM tree.
      e.preventDefault();
      // Get data from state
      var language = this.state.language;
      var exp = this.state.exp;
      var idInterview = "";
        // Add new interview session to db
        postInterviewSession(localStorage.getItem('userId'), (interviewSession) => {
            idInterview = interviewSession._id;
            hashHistory.push("/interview/" + idInterview);
          });
    }

  render() {
    return (
      <div className="container">
        <div className="col-md-6 col-md-offset-3">
          <div className="row">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3>Before we send you off to an interview...</h3>
                <p>
                  Please let us know your preferences so we can find the best match.
                </p>
              </div>
              <div className="panel-body">
                <form className="interview-pref">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <h4> What language(s) are you most comfortable with?</h4>
                      <p className="help-block">Check all that apply</p>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="radio">
                            <label>
                              <input type="radio" name="options" id="options" value="java"/> C/C++
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="radio">
                            <label>
                              <input type="radio" name="options" id="options" value="java"/> Java
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="radio">
                            <label>
                              <input type="radio" name="options" id="options" value="java"/> Python
                            </label>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li className="list-group-item">
                      <h4> How many years of programming experience have you had?</h4>
                      <div className="row">
                        <select className="form-control">
                              <option>Less than 2 years</option>
                              <option>2-5 years</option>
                              <option>5-7 years</option>
                        </select>
                      </div>
                    </li>
                  </ul>

                    <button type="button" className="btn btn-default" onClick={(e) => this.handleMatching(e)}>
                      Find me an interview!
                    </button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
