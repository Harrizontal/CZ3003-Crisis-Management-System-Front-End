import React, { Component } from "react";
import IncidentsSideBar from "./IncidentsSideBar";
import ReactMap2 from "../../../map/ReactMap2";
import Interface2 from "../../../map/Interface2";

const TOKEN =
  "pk.eyJ1IjoiaGFycml6b250YWwiLCJhIjoiY2l6YWw3YW90MDQ1NzJ3cDl5bXd4M2Y4aSJ9.CnTz5K2ShZcuLiG0xYLBKw";
// const LONG = -122.66661759147235;
// const LAT = 45.51886025215052;
const LONG = 103.842275;
const LAT = 1.275635;
const ZOOM = 13;
const STYLE_ID = "ryantm/cj8m5f0136ll12sk7nm8dj00k";

export class IncidentsOverview2 extends Component {
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
        <div style={{ width: "60%", height: "100%", position: "relative" }}>
          {/* <Interface2 />
          <ReactMap2
            token={TOKEN}
            longitude={LONG}
            latitude={LAT}
            zoom={ZOOM}
            showPopUp={true}
            styleID={STYLE_ID}
          /> */}
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
