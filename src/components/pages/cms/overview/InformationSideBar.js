import React, { Component } from "react";
import DengueCluster from "./DengueCluster";
import Weather from "./Weather";

export default class InformationSideBar extends Component {
  _generateInfoComponent(title) {
    switch (title) {
      case "dengue":
        return <DengueCluster />;
      case "weather":
        return <Weather />;
      case "psi":
        break;
      default:
        return <div>No information available</div>;
    }
  }

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
        {this._generateInfoComponent(this.props.selected)}
      </div>
    );
  }
}
