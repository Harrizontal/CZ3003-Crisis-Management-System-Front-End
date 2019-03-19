import React from "react";
import MapView from "../../map/Map_old2";
import { geolocated } from "react-geolocated";

class Overview extends React.Component {
  render() {
    return !this.props.isGeolocationAvailable ? (
      <div>
        Your browser does not support Geolocation
        <div>
          <MapView latitude={1.275635} longitude={103.842275} />
        </div>
      </div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>
        Enable your geolocation
        <MapView latitude={1.275635} longitude={103.842275} />
      </div>
    ) : this.props.coords ? (
      <div>
        <MapView
          latitude={this.props.coords.latitude}
          longitude={this.props.coords.longitude}
        />
      </div>
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Overview);
