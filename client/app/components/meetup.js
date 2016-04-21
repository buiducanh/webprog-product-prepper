import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import update from "react-addons-update";
import {getNearbyUsers, postNotifications} from "../server";

export default class Meetup extends React.Component {
  constructor(props) {
    super(props);
    this.ready = false;
    this.state = {
      markers: []
    }
  }

  //Toggle to 'true' to show InfoWindow and re-renders component
  handleMarkerClick(marker) {
    marker.showInfo = true;
    this.setState(this.state);
  }
  
  handleMarkerClose(marker) {
    marker.showInfo = false;
    this.setState(this.state);
  }

  handleMarkerRightClick(index, event) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    var markers = this.state.markers;
    markers = update(markers, {
      $splice: [
        [index, 1],
      ],
    });
    this.setState({ markers });
  }

  otherRole(role) {
    if (role === 'interviewer') return 'interviewee';
    return 'interviewer';
  }

  handleMeetupRequest(clickEvent, marker) {
    clickEvent.preventDefault();
    this.handleMarkerClose(marker);
    if (clickEvent.button === 0) {
      var callbackFunction = (notiData) => {this.forceUpdate()};
      postNotifications(localStorage.getItem("userId"), marker.userData._id, callbackFunction);
    }
  }

  renderInfoWindow(ref, marker) {
    var userData = marker.userData;
    var userDiv = (
      <div id="content">
        <div id="siteNotice">
        </div>
        <h4 id="firstHeading" className="firstHeading">{userData.fullName}</h4>
        <button className="btn btn-default" type="button" onClick={(e) => this.handleMeetupRequest(e, marker)}>
           Request
        </button>
      </div>
    )
    return (
      
      //You can nest components inside of InfoWindow!
      <InfoWindow 
        key={`${ref}_info_window`}
        onCloseclick={this.handleMarkerClose.bind(this, marker)} >
        {userDiv}
      </InfoWindow>
      
    );
  }

  refresh() {
    var callbackFunction = (nearbyUsers) => {
      var markers = this.state.markers;
      nearbyUsers.map((user) => {
        markers = update(markers, {
          $push: [
            {
              position: user.position,
              defaultAnimation: 2,
              showInfo: false,
              userData: user
            },
          ],
        });
      });
      this.setState({ markers });
    }
    getNearbyUsers(1000, localStorage.getItem("userId"), callbackFunction);
  }

  componentDidMount() {
    this.ready = true;
    while (google === undefined) {};
    this.refresh();
  }

  render() {
    if (!this.ready) {
      return (
        <div className="component-container">
          <div className="row">
          </div>
        </div>
      );
    }
    return (
      <div className="component-container">
        <div className="row">
          <div className="embed-responsive embed-responsive-16by9">
            <div className="embed-responsive-item">
              <section style={{height: "100%"}}>
                <GoogleMapLoader
                  containerElement={
                    <div
                      {...this.props}
                      style={{
                        height: "100%"
                      }}
                    />
                  }
                  googleMapElement={
                    <GoogleMap
                      ref={(map) => (this._googleMapComponent = map)}
                      defaultZoom={13}
                      defaultCenter={{lat: 42.373222, lng: -72.519854}}
                    >
                      {this.state.markers.map((marker, index) => {
                        const ref = `marker_${index}`;
                        return (
                          <Marker
                            {...marker}
                            key={index}
                            ref={ref}
                            onClick={(e) => this.handleMarkerClick(marker, e)}
                          >
                          {/* 
                            Show info window only if the 'showInfo' key of the marker is true. 
                            That is, when the Marker pin has been clicked and 'handleMarkerClick' has been
                            Successfully fired.
                          */}
                          {marker.showInfo ? this.renderInfoWindow(ref, marker) : null}
                        </Marker>
                        );
                      })}
                    </GoogleMap>
                  }
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
