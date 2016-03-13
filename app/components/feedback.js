import React from 'react';
import {getUserData, postFeedbackData} from '../server';
import {Link} from 'react-router';

export default class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      feedbacks: {}
    };
  }

  handleSubmit(clickEvent) {
    clickEvent.preventDefault();
    var pro = $("#pro").val();
    var con = $("#con").val();
    var comment = $("#comments").val();
    var rating = $("#rating").val();

    var myRole = "";
    if (localStorage.getItem("userId") == this.props.params.intervieweeId) myRole = "interviewee";
    else {
      myRole = "interviewer";
    }
    var feedbackData = {
      _id: 1,
      myRole: localStorage.getItem("userId")
    }
    feedbackData[myRole + "_pro"] = pro;
    feedbackData[myRole + "_con"] = con;
    feedbackData[myRole + "_comment"] = comment;
    feedbackData[myRole + "_rating"] = rating;

    if (clickEvent.button === 0) {
      // Callback function for both the like and unlike cases.
      var callbackFunction = (feedbackData) => {
        console.log("submit feedback id: ", feedbackData);
      };
      postFeedbackData(feedbackData, callbackFunction);
    }
  }


  componentDidMount() {
    var partnerId = '';
    if (localStorage.getItem("userId") === this.props.params.intervieweeId) partnerId = this.props.params.interviewerId;
    else {
      partnerId = this.props.params.intervieweeId;
    }
    getUserData(partnerId, (userData) => {
      this.setState({user: userData});
    });
  }

  render() {
    var otherUserName = this.state.user.fullName;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
            </div>
              <div className="col-md-6">
                <div className="panel panel-default textbox-modification textarea">
                  <div className="panel-heading">
                    <div className="col-md-offset-1">
                      <font size="6">Feedback Form</font>
                    </div>
                    <div className="col-md-offset-1">
                      Please provide feedback for:
                      <div className="media">
                        <div className="media-left media-top">
                          PIC
                        </div>
                        <div className="media-body">
                          <Link to={"/userprofile/" + this.state.user._id } ><a href="#">{otherUserName}</a></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="panel-body">
                    <div className="row">
                      <div className="col-md-offset-1">
                        Pros:
                      <div className="row">
                        <textarea id="pro" rows="5" cols="60">
                        </textarea>
                      </div>
                    </div>
                  </div>
                    <div className="row">
                      <div className="col-md-offset-1">
                        Cons:
                      <div className="row">
                        <textarea id="con" rows="5" cols="60">
                        </textarea>
                      </div>
                    </div>
                    </div>
                    <div className="row">
                      <div className="col-md-offset-1">
                        Other comments:
                        <div className="row">
                          <textarea id="comments" rows="5" cols="60">
                          </textarea>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-md-offset-1">
                        Rate your partner(1-10):
                      </div>
                      <textarea className="col-md-offset-1" id="rating" rows="1" cols="18">
                      </textarea>
                    </div>
                  </div>
                  <div className="panel-footer">
                    <div className="row">
                      <div className="col-md-offset-1">
                        <button className="btn btn-default" type="button" onClick={(e) => this.handleSubmit(e)}>
                          Submit Feedback
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
           </div>
         </div>
       </div>
     </div>
    )
  }
}
