import React from 'react';

export default class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      feedbacks: {}
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          Hello Wordl 
        </div>
      </div>
    );
  }
}
