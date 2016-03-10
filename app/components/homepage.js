import React from 'react';
import {getInterviewData} from '../server';
import InterviewSession from './interviewsession';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {interview: []};
  }
  refresh() {
    getInterviewData(this.props.route.user, (interviewData) => {
      this.setState({interview: interviewData});
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-3">
        </div>
        <div className="col-md-6">
          {
            this.state.interview.map((interview, i) => {
              return (<InterviewSession key={i} user={this.props.route.user} interviewsession={interview}/>);
            })
          }
        </div>
      </div>
    )
  }
}
