import React, { Component } from "react";
import IncidentsSideBar from "./IncidentsSideBar";
import ReactMap3 from "../../../map/ReactMap3";

const TOKEN =
  "pk.eyJ1IjoiaGFycml6b250YWwiLCJhIjoiY2l6YWw3YW90MDQ1NzJ3cDl5bXd4M2Y4aSJ9.CnTz5K2ShZcuLiG0xYLBKw";
const LONG = 103.842275;
const LAT = 1.275635;
const ZOOM = 10;
const STYLE_ID = "ryantm/cj8m5f0136ll12sk7nm8dj00k";

export class IncidentsOverview extends Component {
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
        <div style={{ width: "75%", height: "100%", position: "relative" }}>
          <ReactMap3
            token={TOKEN}
            longitude={LONG}
            latitude={LAT}
            zoom={ZOOM}
            showPopUp={true}
            styleID={STYLE_ID}
          />
        </div>
        <div
          style={{
            width: "25%",
            height: "100%",
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
