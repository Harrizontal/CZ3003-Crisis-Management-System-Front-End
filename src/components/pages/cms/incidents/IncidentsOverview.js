import React, { Component } from "react";
import MapView from "../../../map/Map_old2";
import IncidentsSideBar from "./IncidentsSideBar";

export class IncidentsOverview extends Component {
  state = {
    value: 0
  };

  render() {
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
          <MapView latitude={1.275635} longitude={103.842275} />
        </div>
        <div
          style={{
            width: "40%",
            zIndex: 2,
            boxShadow: "-8px 0px 6px -6px rgba(0,0,0,0.25)"
          }}
        >
          <IncidentsSideBar />
        </div>
      </div>
    );
  }
}
