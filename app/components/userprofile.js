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
                </div>
              </div>


              <div className="col-xs-12 divider text-center">
                <div className="col-xs-12 col-sm-4 emphasis">
                  <h2><strong> {this.state.users.interview.length} </strong></h2>
                  <p><small>Interviews</small></p>
                  <button className="btn btn-default btn-block"><span className="glyphicon glyphicon-list-alt"></span> <Link to={"/history/" } >See History</Link> </button>
                </div>

                <div className="col-xs-12 col-sm-4 emphasis">
                  <h2><strong>43</strong></h2>
                  <p><small>Snippets</small></p>
                  <div className="btn-group dropup btn-group-justified">
                    <div className="btn-group">
                      <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-asterisk"></span> Options </button>
                    </div>
                    <div className="btn-group">
                      <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                        <span className="caret"></span>
                        <span className="sr-only">Toggle Dropdown</span>
                      </button>
                      <ul className="dropdown-menu text-left" role="menu">
                        <li><a href="#"><span className="glyphicon glyphicon-envelope pull-right"></span> Send an email </a></li>
                        <li><a href="#"><span className="glyphicon glyphicon-check pull-right"></span> Add or remove from a list  </a></li>
                        <li className="divider"></li>
                        <li><a href="#"><span className="glyphicon glyphicon-ban-circle pull-right"></span>Report this user for spam</a></li>
                        <li className="divider"></li>
                        <li><a href="#" className="btn disabled" role="button"> Unfollow </a></li>
                      </ul>
                    </div>
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
