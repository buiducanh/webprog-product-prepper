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
    if (localStorage.getItem("userId") == this.props.param.intervieweeId) myRole = "interviewee";
    myRole = "interviewer";
    }

    //TODO
    var feedbackData = {
      _id: 1
      myRole: this.state.user
      myRole+"_pro": pro,
      myRole+"_con": con,
      myRole+"_comment": comment,
      myRole+"_rating": rating
    };

    if (clickEvent.button === 0) {
      // Callback function for both the like and unlike cases.
      var callbackFunction = (feedbackData) => {
        // setState will overwrite the 'likeCounter' field on the current
        // state, and will keep the other fields in-tact.
        // This is called a shallow merge:
        // https://facebook.github.io/react/docs/component-api.html#setstate
        this.setState({feedbacks: feedbackData});
      };

      postFeedbackData(feedbackData, callbackFunction);
    }
  }


  componentDidMount() {
      var partnerId = '';
      if (localStorage.getItem("userId") == this.props.param.intervieweeId) partnerId = this.props.param.interviewerId;
      partnerId = this.props.param.intervieweeId;
    getUserData(partnerId, (userData) => {
      this.setState({user: userData});
    });
  }
  render() {
    var otherUserName = this.state.user.fullName;
    var feedbackData = this.state.feedbacks;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              {feedbackData.interviewer_pro}
              {feedbackData.interviewer_con}
              {feedbackData.interviewer_comment}
              {feedbackData.interviewer_rating}
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
                          <Link to={"/userprofile/" + 4 } ><a href="#">{otherUserName}</a></Link>
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
