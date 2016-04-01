import React from 'react';
import {Link} from 'react-router';
import {postInterviewSession} from '../server';

export default class Matching extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        language: "",
        goal: undefined,
        exp: undefined
      };
    }

  handleMatching() {
      // Prevent the event from "bubbling" up the DOM tree.
      // e.preventDefault();
      // Get data from state
      var language = this.state.language;
      var goal = this.state.goal;
      var exp = this.state.exp;
      if (language !== "" && goal !== undefined && exp !== undefined) {
        // Add new interview session to db
        postInterviewSession(4, () => {
          // Database is now updated. Refresh the feed.
          this.refresh();
          });
      }
      return 2;
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
                      <h4> What position are you looking to interview for?</h4>
                      <div className="row">
                        <select className="form-control">
                          <option>Full Time</option>
                          <option>Internship</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <h4> How many years of programming experience have you had?</h4>
                      <div className="row">
                        <select className="form-control">
                              <option>Less than 2 years</option>
                              <option>2-5 years</option>
                              <option>5-7 years</option>
                              <option>More than 7 years</option>
                        </select>
                      </div>
                    </li>
                  </ul>
                  <Link to={"/interview/" + localStorage.getItem("userId") + "/" + this.handleMatching() }>
                    <button type="button" className="btn btn-default">
                      Find me an interview!
                    </button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
