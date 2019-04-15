import React, { Component } from "react";
import DengueCluster from "./DengueCluster";
import Weather from "./Weather";
import PSI from "./PSI";

export default class InformationSideBar extends Component {
  _generateInfoComponent(title) {
    switch (title) {
      case "dengue":
        return <DengueCluster data={this.props.data} />;
      case "weather":
        return <Weather data={this.props.data} />;
      case "psi":
        return <PSI data={this.props.data} />;
      default:
        return <div>No information available</div>;
    }
  }

  render() {
    return <div>{this._generateInfoComponent(this.props.selected)}</div>;
  }
}
