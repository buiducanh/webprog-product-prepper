import {Link} from 'react-router';
import _ from 'lodash';
import React from 'react';

export default class InterviewFeedback extends React.Component {
  render() {
    if (this.props.data==null || this.props.data==undefined)
      return(<div> You have no interview in your history </div>)
    else{
      return(
          <div className="col-md-8">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row part-header"> Interviewer </div>
                  <Link to={"/userprofile/"+this.props.data.interviewer._id}><div style={{"fontSize":"20px"}}> <img src={this.props.data.interviewer.avatar} width='55' height='55'></img> <span> {this.props.data.interviewer.fullName} </span></div></Link>
                  <div style={{"fontSize":"20px"}}>&emsp; &emsp; &nbsp;&nbsp;&nbsp;Email: {this.props.data.interviewer.email}.</div>
                  <div style={{"fontSize":"20px"}}>&emsp; &emsp; &nbsp;&nbsp;&nbsp;Experience: {this.props.data.interviewer.experience}.</div>
                  <div style={{"fontSize":"20px"}}>&emsp; &emsp; &nbsp;&nbsp;&nbsp;Location: {this.props.data.interviewer.location}.</div>
                <div>
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row part-header"> Interviewee </div>
                  <Link to={"/userprofile/"+this.props.data.interviewee._id}><div style={{"fontSize":"20px"}}> <img src={this.props.data.interviewee.avatar} width='55' height='55'></img><span> {this.props.data.interviewee.fullName} </span></div></Link>
                  <div style={{"fontSize":"20px"}}>&emsp; &emsp; &nbsp;&nbsp;&nbsp;Email: {this.props.data.interviewee.email}.</div>
                  <div style={{"fontSize":"20px"}}>&emsp; &emsp; &nbsp;&nbsp;&nbsp;Experience: {this.props.data.interviewee.experience}.</div>
                  <div style={{"fontSize":"20px"}}>&emsp; &emsp; &nbsp;&nbsp;&nbsp;Location: {this.props.data.interviewee.location}.</div>
                <div>
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row part-header"> Interview question </div>
                <hr style={{"marginTop": "2px","marginBottom": "2px","borderTop": "1px solid gray"}}></hr>
                <div>
                  <div style={{"fontSize":"19px"}}>{this.props.data.problem.title}</div>
                  <div>
                    {this.props.data.problem.question}
                  </div>
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row part-header"> Solution </div>
                <hr style={{"marginTop": "2px","marginBottom": "2px","borderTop": "1px solid gray"}}></hr>
                <div style={{"marginTop":"10px","backgroundColor":"white","padding":"10px","overflowY":"auto","height": "300px"}}>
                  {this.props.data.problem.answer}
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row part-header"> Your code </div>
                <hr style={{"marginTop": "2px","marginBottom": "2px","borderTop": "1px solid gray"}}></hr>
                <div style={{"marginTop":"10px","backgroundColor":"white","padding":"10px","overflowY":"auto","height": "300px"}}>
                  {this.props.data.code}
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row part-header"> Feedback </div>
                <hr style={{"marginTop": "2px","marginBottom": "2px","borderTop": "1px solid gray"}}></hr>
                <div>
                  <div style={{"fontSize":"19px"}}> Pros: </div>
                  {this.props.data.feedback.interviewer_pro}
                  <div style={{"fontSize":"19px"}}> Cons: </div>
                  {this.props.data.feedback.interviewer_con}
                  <div style={{"fontSize":"19px"}}> Other comments </div>
                  {this.props.data.feedback.interviewer_comment}
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row part-header"> Rating </div>
                <hr style={{"marginTop": "2px","marginBottom": "2px","borderTop": "1px solid gray"}}></hr>
                <div className="rating">
                  <ul className="list-inline pull-left">
                    {
                      _.times(this.props.data.feedback.interviewer_rating, (i) =>
                        <li key={i}>
                          <a>
                            <span className="glyphicon glyphicon-star"></span>
                          </a>
                        </li>
                      )
                    }
                  </ul>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
      )}
  }
}
