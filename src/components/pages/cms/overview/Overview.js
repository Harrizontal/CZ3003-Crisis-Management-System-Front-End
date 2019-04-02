import React from "react";
import MapView from "../../../map/Map_old2";
import { geolocated } from "react-geolocated";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Weather from "./Weather";

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      lat: 1.275635,
      long: 103.842275
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = e => {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn,
      lat: state.isToggleOn ? 1.275635 : 45.51886,
      long: state.isToggleOn ? 103.842275 : -122.666617
    }));
  };

  render() {
    const isLoggedIn = this.state.isToggleOn;
    let button;
    if (isLoggedIn) {
      button = <MapView latitude={1.275635} longitude={103.842275} />;
    } else {
      button = <MapView latitude={2.275635} longitude={190.842275} />;
    }

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start"
        }}
      >
        <div style={{ width: "60%", height: "100%" }}>
          <MapView latitude={this.state.lat} longitude={this.state.long} />
        </div>

        <div
          style={{
            width: "40%",
            zIndex: 2,
            boxShadow: "-8px 0px 6px -6px rgba(0,0,0,0.25)"
          }}
        >
          <button onClick={this.handleClick}>
            {this.state.isToggleOn ? "ON" : "OFF"}
          </button>
          <Weather />
        </div>
      </div>
    );
    // return !this.props.isGeolocationAvailable ? (
    //   <div>
    //     Your browser does not support Geolocation
    //     <div>
    //
    //     </div>
    //   </div>
    // ) : !this.props.isGeolocationEnabled ? (
    //   <div>
    //     Enable your geolocation
    //     <MapView latitude={1.275635} longitude={103.842275} />
    //   </div>
    // ) : this.props.coords ? (
    //   <div>
    //     <MapView
    //       latitude={this.props.coords.latitude}
    //       longitude={this.props.coords.longitude}
    //     />
    //   </div>
    // ) : (
    //   <div>Getting the location data&hellip; </div>
    // );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Overview);
