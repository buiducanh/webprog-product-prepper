import React from 'react';
import {hashHistory} from 'react-router';
import {postInterviewSession} from '../server';

export default class Matching extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        language: "",
        exp: undefined
      };
    }

  handleLangChange(e) {
    e.preventDefault();
    // e.target is the DOM target of the input event, in this case the dropdown
    // indicating what language the interview will be in
    var language = e.currentTarget.value;
    this.setState({language: language});
  }

  handleExpChange(e) {
    e.preventDefault();
    // e.target is the DOM target of the input event, in this case the dropdown indicating years of exp
    // 1 stands for <2 yrs, 2 for 2-5, 3 for 5+
    var exp = parseInt(e.target.value, 10);
    this.setState({exp: exp});
  }

  handleMatching(e) {
      // Prevent the event from "bubbling" up the DOM tree.
      e.preventDefault();
      var interviewId = "";
      if (this.state.language !== "" && this.state.exp !== undefined) {
        // Add new interview session to db
        postInterviewSession(localStorage.getItem('userId'), (interviewSession) => {
            interviewId = interviewSession._id;
            hashHistory.push("/interview/" + interviewId);
          });
        }
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
                      <h4> What language are you most comfortable interviewing with?</h4>
                      <p className="help-block">Check one that applies</p>
                        <div className="row">
                          <select className="form-control" value={this.state.language} onChange={(e) => this.handleLangChange(e)}>
                                <option value="">Select one</option>
                                <option value="C">C/C++</option>
                                <option value="Java">Java</option>
                                <option value="Python">Python</option>
                          </select>
                        </div>
                    </li>

                    <li className="list-group-item">
                      <h4> How many years of programming experience have you had?</h4>
                      <div className="row">
                        <select className="form-control" value={this.state.exp} onChange={(e) => this.handleExpChange(e)}>
                              <option value="">Select one</option>
                              <option value="1">Less than 2 years</option>
                              <option value="2">2-5 years</option>
                              <option value="3">5-7 years</option>
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
