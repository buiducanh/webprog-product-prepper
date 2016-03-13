import React from 'react';
import {getUserData} from '../server';
import {Link} from 'react-router';

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {users: {languages: [], interview: []}} ;
  }

  refresh() {
    getUserData(this.props.params.id, (userData) => {
      this.setState({users: userData});
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render () {
    return (
      <div className="userprofile">
        <div className="container">
          <div className="row">

            <div className="col-md-offset-1 col-lg-9">
              <div className="card">
                <div className="card-image">
                  <img className="img-responsive" style={{"maxHeight":"2000px",height:"350px", "maxWidth":"2000px",width:"1000px"}} src={this.state.users.cover}> </img>
                </div>
                <div className="card-user">
                  <img className="img-responsive userpic" style={{"maxHeight":"200px", height:"100px", "maxWidth":"200px", width:"100px"}} src={this.state.users.avatar}></img>
                </div>
              </div>
            </div>
          </div>
        </div>

      <div classNameName="container">
        <div className="row">

          <div className="col-md-offset-1 col-lg-9">
            <div className="profile">
              <div className="col-sm-12">
                <div className="col-md-12 info">
                  <h2>{this.state.users.fullName}</h2>
                  <p><strong>Email: </strong> {this.state.users.email} </p>
                  <hr />
                  <p><strong>Skills: </strong>
                    {
                      this.state.users.languages.map((language, i) => {
                        return (<span key={i} className="tags">{language}</span>);
                      })
                    }
                  </p>
                  <hr />
                  <p><strong>Location: </strong> {this.state.users.location} </p>
                </div>
              </div>


              <div className="col-xs-12 divider text-center">

                <div className="col-sm-2 emphasis">


                </div>
                <div className="col-xs-12 col-sm-6 emphasis">
                  <h2><strong> {this.state.users.interview.length} </strong></h2>
                  <p><small>Interviews</small></p>
                  <button className="btn btn-default btn-block"><span className="glyphicon glyphicon-list-alt"></span> <Link to={"/history/" } >See History</Link> </button>
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
