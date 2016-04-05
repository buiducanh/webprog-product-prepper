import React from 'react';
import {Link} from 'react-router';

export default class CodeEditor extends React.Component {
  componentDidMount() {
    var firepadRef = new Firebase('https://brilliant-torch-7009.firebaseio.com/firepads/putInterviewIdHere');
    var codeMirror = CodeMirror(document.getElementById('firepad'), { lineWrapping: true });
    var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror,
        { richTextShortcuts: true, richTextToolbar: true, placeholder : 'Put your code here!' });
  }

  render() {
    var interviewerId = this.props.interviewerId;
    var intervieweeId = this.props.intervieweeId;

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
                  <button  type="button" className="btn btn-default">
                    <span className="glyphicon glyphicon-ban-circle"></span>  End Interview
                  </button>
                </Link>


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
