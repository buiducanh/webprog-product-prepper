import React from 'react';
import {Link} from 'react-router';

export default class CodeEditor extends React.Component {

  render() {
    var interviewerId = this.props.interviewsession.interviewer;
    var intervieweeId = this.props.interviewsession.interviewee;

    return(
        <div className="col-md-8">
          <div className="panel panel-default">
            <div className="panel-heading">
                <button type="button" className="btn btn-default" style={{height: '35px'}} >
                  <p> Language
                    <select>
                      <option value="Python"> Python </option>
                      <option value="Java"> Java </option>
                      <option value="PHP"> C </option>
                    </select>
                  </p>
                </button>

                <Link to={"/feedback/" + interviewerId + "/" + intervieweeId}>
                  <button  type="button" className="btn btn-default" onClick={(e) => this.handleSubmit(e)}>
                    <span className="glyphicon glyphicon-ban-circle"></span>  End Interview
                  </button>
                </Link>


            </div>
            <div className="panel-body" style={{height: '490px'}}>
            Code Editor
            </div>
          </div>
        </div>
      )
    }
  }
