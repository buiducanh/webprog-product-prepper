import React from 'react';


export default class Interview extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
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
          </div>
        </div>//end

        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                Interview Question
                <textarea rows="15" cols="43">
                  {this.props.children}
                </textarea>
              </div>
            </div>
          </div>
        </div>

          <div className="col-md-8">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-default" style={{height: '35px'}} >
                    <p> Language
                      <select>
                        <option value="Python"> Python </option>
                        <option value="Java"> Java </option>
                        <option value="PHP"> C </option>
                      </select>
                    </p>
                  </button>
                </div>
                <button className="btn btn-default" type="button">
                  <span className="glyphicon glyphicon-ban-circle"></span>
                  End Interview
                </button>
              </div>
              <div className="panel-body" style={{height: '490px'}}>
                {this.props.children}
                <br /> {this.props.postDate}
              </div>
            </div>
          </div>

      </div>
    )
  }
}
