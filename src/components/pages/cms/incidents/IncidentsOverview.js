import React, { Component } from "react";
import IncidentsSideBar from "./IncidentsSideBar";
import ReactMap3 from "../../../map/ReactMap3";
import CreateIncidentButton from "../../../map/CreateIncidentButton";
import { Config } from "../../../../Config";
import ongoing from "../../../../resources/ongoing.png";
import pending from "../../../../resources/pending.png";

const TOKEN = Config.MAPBOX_API;
const LONG = Config.LONG;
const LAT = Config.LAT;
const ZOOM = Config.ZOOM;
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
          <CreateIncidentButton history={this.props.history} />
          <ReactMap3
            token={TOKEN}
            longitude={LONG}
            latitude={LAT}
            zoom={ZOOM}
            showPopUp={true}
            styleID={STYLE_ID}
          />
        <div 
          style={{
            position:"absolute",
            margin:"50",
            zIndex:"2",
            bottom: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            }}
            className="legendbarContainer">
          <div className="legend">
            <div className="legend-header">legend: </div>
            <div className="legend-item">
              <div className="legend-label">pending </div>
              <img src={pending} style={{width:"30px", height:"30px"}} />
            </div>
            <div className="legend-item">
              <div className="legend-label">ongoing </div>
              <img src={ongoing} style={{width:"30px", height:"30px"}} />
            </div>
          </div>
        </div>
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
