import React from 'react';
import {getInterviewData} from '../server';



export default class Questions extends React.Component {

  constructor(props) {
     super(props);
     this.state = {interview: []};
   }

   refresh() {
     getInterviewData(this.props.user, (interviewData) => {
       this.setState({interview: interviewData});
     });
   }

   componentDidMount() {
     this.refresh();
   }

  render() {
    return (
          <div className="panel panel-default">
            <div className="panel-heading">
              <div> <h4>Interview Quesions</h4> </div>
              <hr></hr>
                <div>
                  {
                    this.state.interview.map((interview, i) => {
                      return (<span key={i}>{this.props.interview.problem.title}</span>);
                    })
                  }
                </div>
            </div>
          </div>
      )
    }
  }
