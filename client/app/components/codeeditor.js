import React from 'react';
import {Link} from 'react-router';
import {endInterview} from '../server';


var interviewId = -1;
export default class CodeEditor extends React.Component {
  componentDidMount() {
    var firepadLink = 'https://brilliant-torch-7009.firebaseio.com/firepads/'+interviewId;
    var firepadRef = new Firebase(firepadLink);
    var codeMirror = CodeMirror(document.getElementById('firepad'), { lineWrapping: true });
    this.firepad = Firepad.fromCodeMirror(firepadRef, codeMirror,
        { richTextShortcuts: true, richTextToolbar: true, placeholder : 'Put your code here!' });
  }

  handleEndInterview() {
    this.endTime = new Date().getTime();
    var duration = Math.floor((this.endTime-this.startTime)/1000);
    var code = this.firepad.getText();
    var interviewer_id = this.props.interviewerId;
    var interviewee_id = this.props.intervieweeId;
    var interviewId = Number(this.props.interviewId);
    endInterview(duration, code, interviewer_id, interviewee_id, interviewId,function(){
    });
  }

  render() {
    var interviewerId = this.props.interviewerId;
    var intervieweeId = this.props.intervieweeId;
    interviewId = this.props.interviewId;
    this.startTime = new Date().getTime();
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

                  <button type="button" className="btn btn-default" onClick={(e) => this.handleEndInterview(e)}>
                    <Link to={"/feedback/" + interviewId + "/" + interviewerId + "/" + intervieweeId}>
                      <span className="glyphicon glyphicon-ban-circle"></span>  End Interview
                    </Link>
                  </button>

            </div>
            <div className="panel-body" style={{height: '490px'}}>
            Code Editor<br></br>
          <div id="firepad" style={{ width: '700px',height: '450px',backgroundColor: '#f62'}}>

          </div>

            </div>
          </div>
        </div>
      )
    }
  }
