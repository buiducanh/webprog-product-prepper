import React from 'react';

export default class InterviewFeedback extends React.Component {
  render() {
    if (this.props.data==null)
      return(<div></div>)
    else{
      return(
          <div className="col-md-8">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row part-header"> Interviewer </div>
                <a href={`#/userprofile/${this.props.data.interviewer._id}`}><div style={{"fontSize":"20px"}}> <span style={{"border":"1px solid gray"}}> PIC </span> &nbsp;&nbsp;&nbsp;&nbsp;<span> {this.props.data.interviewer.fullName} </span></div></a>
                  <div style={{"fontSize":"20px"}}>&emsp; &emsp; &nbsp;&nbsp;&nbsp;Email: {this.props.data.interviewer.email}.</div>
                  <div style={{"fontSize":"20px"}}>&emsp; &emsp; &nbsp;&nbsp;&nbsp;Experience: {this.props.data.interviewer.experience}.</div>
                <div>
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row part-header"> Interviewee </div>
                <a href={`#/userprofile/${this.props.data.interviewee._id}`}><div style={{"fontSize":"20px"}}> <span style={{"border":"1px solid gray"}}> PIC </span> &nbsp;&nbsp;&nbsp;&nbsp;<span> {this.props.data.interviewee.fullName} </span></div></a>
                  <div style={{"fontSize":"20px"}}>&emsp; &emsp; &nbsp;&nbsp;&nbsp;Email: {this.props.data.interviewee.email}.</div>
                  <div style={{"fontSize":"20px"}}>&emsp; &emsp; &nbsp;&nbsp;&nbsp;Experience: {this.props.data.interviewee.experience}.</div>
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
                <div className="row part-header"> Your code </div>
                <hr style={{"marginTop": "2px","marginBottom": "2px","borderTop": "1px solid gray"}}></hr>
                <div style={{"marginTop":"10px","backgroundColor":"white","padding":"10px","overflowY":"auto","height": "300px"}}>
                  {this.props.data.problem.answer}
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
                  {this.props.data.feedback.interviewer_rating}/10
                </div>
              </div>
            </div>
          </div>
      )}
  }
}
// <div className="panel panel-default">
//   <div className="panel-heading">
//     <div className="row part-header"> Solution </div>
//     <hr style={{"marginTop": "2px","marginBottom": "2px","borderTop": "1px solid gray"}}></hr>
//     <div> This question can be solve in time O(x) and space O(y) using z algorithm as below: </div>
//     <div style={{"marginTop":"10px","backgroundColor":"white","padding":"10px","overflowY":"auto","height": "300px"}}>
//       <span className="keyword"> class </span> Solution(object): <br></br>
//           &emsp;<span className="keyword">def </span> countNodes(self, root):<br></br>
//           &emsp;&emsp;<span className="keyword">return</span> 0;
//           <br></br>
//           <br></br>
//           <br></br>
//           <br></br>
//           <br></br>
//     </div>
//   </div>
// </div>

// <span> ★ </span><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span><span>☆</span><span>☆</span>
