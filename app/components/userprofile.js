import React from 'react';

export default class UserProfile extends React.Component {

  render () {
    return (
      <div className="userprofile">
        <div className="container">
          <div className="row">

            <div className="col-md-offset-1 col-lg-9">
              <div className="card">
                <div className="card-image">
                  <img className="img-responsive" style={{"maxHeight":"2000px",height:"350px", "maxWidth":"2000px",width:"1000px"}} src={"http://cdn-img.fimfiction.net/story/8fas-1432553431-172259-full"}> </img>
                </div>
                <div className="card-user">
                  <img className="img-responsive userpic" style={{"maxHeight":"200px", height:"100px", "maxWidth":"200px", width:"100px"}} src={"http://i100.independent.co.uk/image/28166-4lg5eo.jpg"}></img>
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
                  <h2>Harry Potter</h2>
                  <p><strong>Email: </strong> Web Designer / UI. </p>
                  <hr />
                  <p><strong>Skills: </strong>
                    <span className="tags">html5</span>
                    <span className="tags">css3</span>
                    <span className="tags">jquery</span>
                    <span className="tags">bootstrap3</span>
                  </p>
                </div>

                <div className="col-xs-12 col-sm-4 text-center">
                  <figure>
                    <figcaption className="ratings">
                      <p>Ratings
                        <a href="#">
                          <span className="glyphicon glyphicon-star"></span>
                        </a>
                        <a href="#">
                          <span className="glyphicon glyphicon-star"></span>
                        </a>
                        <a href="#">
                          <span className="glyphicon glyphicon-star"></span>
                        </a>
                        <a href="#">
                          <span className="glyphicon glyphicon-star"></span>
                        </a>
                        <a href="#">
                          <span className="glyphicon glyphicon-star"></span>
                        </a>
                      </p>
                    </figcaption>
                  </figure>
                </div>
              </div>


              <div className="col-xs-12 divider text-center">
                <div className="col-xs-12 col-sm-4 emphasis">
                  <h2><strong> 20 </strong></h2>
                  <p><small>Interviews</small></p>
                  <button className="btn btn-default btn-block"><span className="glyphicon glyphicon-list-alt"></span> See History </button>
                </div>
                <div className="col-xs-12 col-sm-4 emphasis">
                  <h2><strong>245</strong></h2>
                  <p><small>Followers</small></p>
                  <button className="btn btn-default btn-block"><span className="glyphicon glyphicon-user"></span> View Followers </button>
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
