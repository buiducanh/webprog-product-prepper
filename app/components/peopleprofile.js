import React from 'react';
import {getAllUserData} from '../server';
import {Link} from 'react-router';

export default class PeopleProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  users: [] };
  }

  refresh() {
    getAllUserData((userData) => {
      this.setState({users: userData});
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div className="peopleprofile">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
            </div>

            <div className="col-md-7">
              <div className="wrapper1">
                <span className="group1">
                  <h4><i className="fa fa-user"></i> All Users</h4>
                </span>
              </div>

            </div>
            <div className="col-md-1">
              <i className="fa fa-plus-square fa-3x"></i>
            </div>
          </div>
        </div>

        <div className="containter">
          <div className="row">

            <div className="col-md-3">
            </div>

            <div className="col-md-6">
            {
              this.state.users.map((user, i) => {
                return (

                  <div key={i} className=" main container-fluid well col-md-12">
                    <div className="row-fluid">
                      <div className="col-lg-3" >
                        <img src={user.avatar}
                          className="img-circle img-responsive"></img>
                      </div>

                      <div className="col-lg-6">
                        <h2><Link to={"/userprofile/" + user._id } >{user.fullName}</Link></h2>
                        <h5>Email: {user.email}</h5>
                        <h5>Experience: {user.experience} year(s) </h5>
                        <h5>Location: {user.location} </h5>
                      </div>

                      <div className="col-lg-3">

                      </div>

                    </div>
                  </div>

                )
              })
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
