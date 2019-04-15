import React, { Component } from "react";
import DengueCluster from "./DengueCluster";
import Weather from "./Weather";
import PSI from "./PSI";

export default class InformationSideBar extends Component {
  _generateInfoComponent(title, data) {
    switch (title) {
      case "weather":
        console.log(data);
        return <Weather data={this.props.data} />;
      case "psi":
        console.log(this.props.mapSource);
        return <PSI mapSource={this.props.mapSource} />;
      default:
        return <div>No other information available</div>;
    }
  }

  render() {
    return (
      <div>
        {this._generateInfoComponent(this.props.selected, this.props.data)}
      </div>
    );
  }
}
