import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";

export default class Meetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{
        position: {
          lat: 25.0112183,
          lng: 121.52067570000001,
        },
        key: `Taiwan`,
        defaultAnimation: 2,
      }]
    }
  }

  handleMapClick(event) {
    var markers = this.state;
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
                      defaultZoom={3}
                      defaultCenter={{lat: -25.363882, lng: 131.044922}}
                      onClick={this.handleMapClick.bind(this)}
                    >
                      {this.state.markers.map((marker, index) => {
                        return (
                          <Marker
                            {...marker}
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
