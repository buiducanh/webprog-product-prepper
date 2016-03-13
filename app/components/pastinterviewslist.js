import React from 'react';

export default class PastInterviewsList extends React.Component {
  render() {
    return (
      <div className="col-md-4">
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="row part-header">Your past mock interview</div>
            <hr style={{"marginTop": "2px","marginBottom": "2px","borderTop": "1px solid gray"}}></hr>
            <ul className="mock-list">
              <a href="#"><li className="mock-list-element"> 02/02/16 - 19:30 </li> </a>
              <a href="#"><li className="mock-list-element" style={{"listStyleType":"disc","fontWeight": "bold"}}> 02/03/16 - 09:30 </li> </a>
              <a href="#"><li className="mock-list-element"> 02/04/16 - 13:45 </li> </a>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
