import React from 'react';
import {ResetDatabase} from '../database';
import {Link} from 'react-router';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link to="/">
            <img className="logo" alt="Brand" src="img/pic.png"></img>
          </Link>
        </div>
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <div className="nav navbar-nav navbar-left">
            <span id="db-reset">
              <ResetDatabase />
            </span>
            <button type="button" className="navbar-btn btn btn-default">
              <span className="glyphicon glyphicon-flash"></span> Interview
            </button>


            <Link to='/interview'><button type="button" className="navbar-btn btn btn-default">
              <span className="glyphicon glyphicon-flash"></span> Test
            </button></Link>

            <button type="button" className="navbar-btn btn btn-default">
              <span className="glyphicon glyphicon-globe"></span> Meetup
            </button>
            <div className="btn-group" role="group">
              <button type="button" className="navbar-btn btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                <span className="glyphicon glyphicon-comment"></span> Notifications <span className="badge">4</span>
              </button>
              <ul className="dropdown-menu meetup">
                <li>
                  <div className="media">
                    <div className="media-left">
                      Pic
                    </div>
                    <div className="media-body">
                      Request from NewUser1<span className="pull-right">&nbsp;&nbsp;&nbsp;</span>
  <button className="pull-right btn btn-xs btn-success glyphicon glyphicon-ok"></button> <button className="btn btn-xs btn-danger glyphicon glyphicon-remove pull-right"></button>
                    </div>
                  </div>
                </li>
                <li role="separator" className="divider"></li>
                <li>
                  <div className="media">
                    <div className="media-left">
                      Pic
                    </div>
                    <div className="media-body">
                      Request from NewUser1<span className="pull-right">&nbsp;&nbsp;&nbsp;</span>
  <button className="pull-right btn btn-xs btn-success glyphicon glyphicon-ok"></button> <button className="btn btn-xs btn-danger glyphicon glyphicon-remove pull-right"></button>
                    </div>
                  </div>
                </li>
                <li role="separator" className="divider"></li>
                <li>
                  <div className="media">
                    <div className="media-left">
                      Pic
                    </div>
                    <div className="media-body">
                      Request from NewUser1<span className="pull-right">&nbsp;&nbsp;&nbsp;</span>
  <button className="pull-right btn btn-xs btn-success glyphicon glyphicon-ok"></button> <button className="btn btn-xs btn-danger glyphicon glyphicon-remove pull-right"></button>
                    </div>
                  </div>
                </li>
                <li role="separator" className="divider"></li>
                <li>
                  <div className="media">
                    <div className="media-left">
                      Pic
                    </div>
                    <div className="media-body">
                      Request from NewUser1<span className="pull-right">&nbsp;&nbsp;&nbsp;</span>
  <button className="pull-right btn btn-xs btn-success glyphicon glyphicon-ok"></button> <button className="btn btn-xs btn-danger glyphicon glyphicon-remove pull-right"></button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="nav navbar-nav navbar-right">
            <div className="btn-toolbar navbar-right" role="toolbar">
              <div className="btn-group" role="group">
                <button type="button" className="navbar-btn btn btn-default">
                  PIC
                </button>
              </div>
              <div className="btn-group" role="group">
                <button type="button" className="navbar-btn btn btn-default dropdown-toggle" data-toggle="dropdown">
                  USERNAME
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a href="#">Meetup chat</a>
                  </li>
                  <li>
                    <a href="#">Profile</a>
                  </li>
                  <li>
                    <a href="#">Log out</a>
                  </li>
                </ul>
              </div>
            </div>
            <form className="navbar-form navbar-right" role="search">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search candidates"></input>
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-default">
                    <span className="glyphicon glyphicon-search"></span>
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
