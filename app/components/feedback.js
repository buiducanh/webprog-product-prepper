import React from 'react';

export default class Feedback extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
            </div>
              <div className="col-md-6">
                <div className="panel panel-default textbox-modification textarea">
                  <div className="panel-heading">
                    <div className="col-md-offset-1">
                      <font size="6">Feedback Form</font>
                    </div>
                    <div className="col-md-offset-1">
                      Please provide feedback for:
                      <div className="media">
                        <div className="media-left media-top">
                          PIC
                        </div>
                        <div className="media-body">
                          <a href="#">prep_buddy</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="panel-body">
                    <div className="row">
                      <div className="col-md-offset-1">
                        <strong>I am rating my..</strong>
                      </div>
                        <div className="col-md-3 col-md-offset-1">
                          <div className="radio">
                            <label>
                              <input type="radio" name="options" id="option1" /> Interviewer
                            </label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="radio">
                            <label>
                              <input type="radio" name="options" id="option2" /> Interviewee
                            </label>
                          </div>
                          </div>
                      </div>
                    <br />
                    <div className="row">
                      <div className="col-md-offset-1">
                        Pros:
                      <div className="row">
                        <textarea rows="5" cols="60">
                        </textarea>
                      </div>
                    </div>
                  </div>
                    <div className="row">
                      <div className="col-md-offset-1">
                        Cons:
                      <div className="row">
                        <textarea rows="5" cols="60">
                        </textarea>
                      </div>
                    </div>
                    </div>
                    <div className="row">
                      <div className="col-md-offset-1">
                        Other comments:
                        <div className="row">
                          <textarea rows="5" cols="60">
                          </textarea>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-md-offset-1">
                        Rate your partner:
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-offset-1">
                        <ul className="list-inline">
                          <li>
                              <span className="glyphicon glyphicon-star-empty"></span>
                          </li>
                          <li>
                              <span className="glyphicon glyphicon-star-empty"></span>
                          </li>
                          <li>
                              <span className="glyphicon glyphicon-star-empty"></span>
                          </li>
                          <li>
                              <span className="glyphicon glyphicon-star-empty"></span>
                          </li>
                          <li>
                              <span className="glyphicon glyphicon-star-empty"></span>
                          </li>
                          <li>
                              <span className="glyphicon glyphicon-star-empty"></span>
                          </li>
                          <li>
                              <span className="glyphicon glyphicon-star-empty"></span>
                          </li>
                          <li>
                              <span className="glyphicon glyphicon-star-empty"></span>
                          </li>
                          <li>
                              <span className="glyphicon glyphicon-star-empty"></span>
                          </li>
                          <li>
                              <span className="glyphicon glyphicon-star-empty"></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="panel-footer">
                    <div className="row">
                      <div className="col-md-offset-1">
                        <button className="btn btn-default" type="button">
                          Submit Feedback
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
           </div>
         </div>
       </div>
     </div>
    )
  }
}
