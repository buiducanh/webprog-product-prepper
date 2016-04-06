import React from 'react';



export default class Questions extends React.Component {
  render() {
    var data = this.props.interviewquestion;
    return (
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4>Interview Quesions</h4>
                <div>
                    {data.problem.title};
                    {data.problem.question};
                </div>
            </div>
          </div>
      )
    }
  }
