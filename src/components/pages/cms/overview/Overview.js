import React, { Component } from "react";
import InformationSideBar from "./InformationSideBar";
import ReactMap2 from "../../../map/ReactMap2";
import Interface2 from "../../../map/Interface2";
import { connect } from "react-redux";
import { Config } from "../../../../Config";

const TOKEN = Config.MAPBOX_API;
const LONG = Config.LONG;
const LAT = Config.LAT;
const ZOOM = Config.ZOOM;
const STYLE_ID = "ryantm/cj8m5f0136ll12sk7nm8dj00k";

class Overview extends Component {
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
        <div style={{ width: "75%", height: "100%", position: "relative" }}>
          <Interface2 />
          <ReactMap2
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
            zIndex: 2,
            boxShadow: "-8px 0px 6px -6px rgba(0,0,0,0.25)"
          }}
        >
          <InformationSideBar
            selected={this.props.mapInformation["selected"]}
            data={this.props.mapInformation["information"]}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mapInformation: state.overviewInformation
  };
}

export default connect(
  mapStateToProps
  //   mapDispatchToProps
)(Overview);
