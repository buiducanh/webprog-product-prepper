import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import update from "react-addons-update";

export default class Meetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{
        position: {
          lat: 42.373864,
          lng: -72.515388,
        },
        key: `User1`,
        defaultAnimation: 2,
      },
      {position: { lat: 42.373468, lng: -72.524271 }, key: "User2", defaultAnimation: 2},
      {position: { lat: 42.371344, lng: -72.520924 }, key: "User3", defaultAnimation: 2}
      ]
    }
  }

  handleMapClick(event) {
    var markers = this.state.markers;
    markers = update(markers, {
      $push: [
        {
          position: event.latLng,
          defaultAnimation: 2,
          key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
        },
      ],
    });
    this.setState({ markers });

    if (markers.length === 3) {
      this.props.toast(
        `Right click on the marker to remove it`,
        `Also check the code!`
      );
    }
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
  componentDidMount() {
  }
  render() {
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
                        return (
                          <Marker
                            {...marker}
                            onClick={(e) => this.handleMarkerRightClick(index, e)}
                             />
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
