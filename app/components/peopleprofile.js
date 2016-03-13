import React from 'react';
import {getUserData} from '../server';

export default class PeopleProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  users: [] };
  }

  refresh() {
    getUserData(this.props.params.id, (userData) => {
      this.setState({users: userData});
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (

      {
        this.state.map((interview, i) => {
          return (<InterviewSession key={i} user={this.props.route.user} interviewsession={interview}/>);
        })
      }

      <div>
      <div className=" main container-fluid well col-md-6">
      <div className="row-fluid">
            <div className="col-lg-3" >
            <img src="http://www.cartoonbucket.com/wp-content/uploads/2015/03/Sitting-Image-Of-Nobita.png"
                    className="img-circle img-responsive"></img>
            </div>

            <div className="col-lg-6">
                <h2>{this.state.users.fullName}</h2>
                <h5>Email: {this.state.users.email}</h5>
                <h5>Experience: {this.state.users.experience} </h5>
                <h5><a href="#">More... </a></h5>
            </div>

            <div className="col-lg-3">
                <div className="btn-group">
                    <a className="btn dropdown-toggle" data-toggle="dropdown" href="#">
                        <i className="glyphicon glyphicon-cog glyphicon-white"></i>
                        Action
                        <i className="caret"></i>
                    </a>
                    <ul className="dropdown-menu">
                        <li><a href="#"><i className="glyphicon glyphicon-wrench"></i> Modify</a></li>
                        <li><a href="#"><i className="glyphicon glyphicon-trash"></i> Delete</a></li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
    );
  }
}
