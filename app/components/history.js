import React from 'react';


export default class History extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
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
          <div className="col-md-8">
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row part-header"> Interviewer </div>
                <a href="#"><div style={{"fontSize":"20px"}}> <span style={{"border":"1px solid gray"}}> PIC </span> &nbsp;&nbsp;&nbsp;&nbsp;<span> Bill Gates </span></div></a>
                <div style={{"fontSize":"20px"}}>&emsp; &emsp; &nbsp;&nbsp;&nbsp;Works at Microsoft.</div>
                <div style={{"fontSize":"20px"}}>&emsp; &emsp; &nbsp;&nbsp;&nbsp;<a href="#" style={{"color":"#0033CC"}}>Linkedin</a></div>
                <div style={{"fontSize":"20px"}}>&emsp; &emsp; &nbsp;&nbsp;&nbsp;<a href="#" style={{"color":"#0033CC"}}>Facebook</a></div>
                <div>
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row part-header"> Interviewee </div>
                <a href="#"><div style={{"fontSize":"20px"}}> <span style={{"border":"1px solid gray"}}> PIC </span>&nbsp;&nbsp;&nbsp;&nbsp; <span> Mark Zuckerberg </span></div></a>
                <div style={{"fontSize":"20px"}}>&emsp; &emsp; &nbsp;&nbsp;&nbsp;Works at Facebook.</div>
                <div style={{"fontSize":"20px"}}>&emsp; &emsp; &nbsp;&nbsp;&nbsp;<a href="#" style={{"color":"#0033CC"}}>Linkedin</a></div>
                <div style={{"fontSize":"20px"}}>&emsp; &emsp; &nbsp;&nbsp;&nbsp;<a href="#" style={{"color":"#0033CC"}}>Facebook</a></div>
                <div>
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row part-header"> Interview question </div>
                <hr style={{"marginTop": "2px","marginBottom": "2px","borderTop": "1px solid gray"}}></hr>
                <div>
                  <div style={{"fontSize":"19px"}}>Count Complete Tree Nodes</div>
                  <div> Given a complete binary tree, count the number of nodes. <br> </br>
                    In a complete binary tree every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.
                  </div>
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row part-header"> Your code </div>
                <hr style={{"marginTop": "2px","marginBottom": "2px","borderTop": "1px solid gray"}}></hr>
                <div style={{"marginTop":"10px","backgroundColor":"white","padding":"10px","overflowY":"auto","height": "300px"}}>
                  <span className="keyword"> class </span> Solution(object): <br></br>
                      &emsp;<span className="keyword">def </span> countNodes(self, root):<br></br>
                      &emsp;&emsp;<span className="keyword">return</span> 0;
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row part-header"> Solution </div>
                <hr style={{"marginTop": "2px","marginBottom": "2px","borderTop": "1px solid gray"}}></hr>
                <div> This question can be solve in time O(x) and space O(y) using z algorithm as below: </div>
                <div style={{"marginTop":"10px","backgroundColor":"white","padding":"10px","overflowY":"auto","height": "300px"}}>
                  <span className="keyword"> class </span> Solution(object): <br></br>
                      &emsp;<span className="keyword">def </span> countNodes(self, root):<br></br>
                      &emsp;&emsp;<span className="keyword">return</span> 0;
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row part-header"> Feedback </div>
                <hr style={{"marginTop": "2px","marginBottom": "2px","borderTop": "1px solid gray"}}></hr>
                <div>
                  <div style={{"fontSize":"19px"}}> Pros: </div>
                  <ul>
                    <li> Code is very clear. </li>
                    <li> Good problem solving skill. </li>
                    <li> Handsome. </li>
                  </ul>
                  <div style={{"fontSize":"19px"}}> Cons: </div>
                  <ul>
                    <li> Need to talk more while coding. </li>
                    <li> Please dont use global variable. </li>
                    <li> Too handsome. </li>
                  </ul>
                  <div style={{"fontSize":"19px"}}> Other comments </div>
                  <div style={{"paddingLeft":"20px"}}>
                      Woof woof!
                  </div>
                </div>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">
                <div className="row part-header"> Rating </div>
                <hr style={{"marginTop": "2px","marginBottom": "2px","borderTop": "1px solid gray"}}></hr>
                <div className="rating">
                  <span> ★ </span><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span><span>☆</span><span>☆</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
