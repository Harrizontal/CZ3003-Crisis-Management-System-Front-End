import React, { Component } from "react";
import DengueCluster from "./DengueCluster";

export default class InformationSideBar extends Component {
  _generateInfoComponent(title) {
    switch (title) {
      case "dengue":
        return <DengueCluster />;
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
