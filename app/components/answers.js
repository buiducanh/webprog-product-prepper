import React from 'react';

export default class Answers extends React.Component {
  render() {
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
                <button  type="button" className="btn btn-default">
                  <span className="glyphicon glyphicon-ban-circle"></span>  End Interview
                </button>
            

            </div>
            <div className="panel-body" style={{height: '490px'}}>
            </div>
          </div>
        </div>
      )
    }
  }
