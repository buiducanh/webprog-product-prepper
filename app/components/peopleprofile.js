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
            {
              this.state.users.map((user, i) => {
                return (

                  <div key={i} className=" main container-fluid well col-md-6">
                    <div className="row-fluid">
                      <div className="col-lg-3" >
                        <img src="http://www.cartoonbucket.com/wp-content/uploads/2015/03/Sitting-Image-Of-Nobita.png"
                          className="img-circle img-responsive"></img>
                      </div>

                      <div className="col-lg-6">
                        <h2><Link to={"/userprofile/" + user._id } >{user.fullName}</Link></h2>
                        <h5>Email: {user.email}</h5>
                        <h5>Experience: {user.experience} </h5>
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

                )
              })
            }
          </div>
        </div>
      </div>




    );
  }
}
