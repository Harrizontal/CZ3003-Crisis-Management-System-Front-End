import React, { Component } from "react";

export default class Weather extends Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        Weather
        <div style={{ width: "100%", height: "50%" }}>Weather</div>
        <div style={{ width: "100%", height: "50%" }}>adasd</div>
      </div>
    );
  }
}
