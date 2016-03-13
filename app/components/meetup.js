import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import update from "react-addons-update";

export default class Meetup extends React.Component {
  constructor(props) {
    super(props);
    this.ready = false;
    this.state = {
      markers: [{
        position: {
          lat: 42.373864,
          lng: -72.515388,
        },
        showInfo: false,
        defaultAnimation: 2,
      },
      {position: { lat: 42.373468, lng: -72.524271 }, defaultAnimation: 2, showInfo: false},
      {position: { lat: 42.371344, lng: -72.520924 }, defaultAnimation: 2, showInfo: false}
      ]
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

  handleMapClick(event) {
    var markers = this.state.markers;
    markers = update(markers, {
      $push: [
        {
          position: event.latLng,
          defaultAnimation: 2,
          showInfo: false,
        },
      ],
    });
    this.setState({ markers });
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

  renderInfoWindow(ref, marker) {
    var user = (
      <div id="content">
        <div id="siteNotice">
        </div>
        <h4 id="firstHeading" className="firstHeading">NewUser</h4>
        <button className="btn btn-default" type="button">
           Request
        </button>
      </div>
    )
    return (
      
      //You can nest components inside of InfoWindow!
      <InfoWindow 
        key={`${ref}_info_window`}
        onCloseclick={this.handleMarkerClose.bind(this, marker)} >
        {user}
      </InfoWindow>
      
    );
  }

  refresh() {
    var nearbyUsers = getNearbyUsers(3, localStorage.getItem("userId"))
  }

  componentDidMount() {
    this.ready = true;
    this.refresh();
  }

  render() {
    if (!this.ready) {
      return (
        <div className="container">
          <div className="row">
          </div>
        </div>
      );
    }
    return (
      <div className="container">
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
                      ref={(map) => (this._googleMapComponent = map) && console.log(map)}
                      defaultZoom={13}
                      defaultCenter={{lat: 42.373222, lng: -72.519854}}
                      onClick={this.handleMapClick.bind(this)}
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
