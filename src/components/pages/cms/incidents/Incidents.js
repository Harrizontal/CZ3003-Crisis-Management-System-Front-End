import React, { Component } from "react";

export class Incidents extends Component {
  state = {
    value: 0
  };

  render() {
    return <div>{this.state.value}</div>;
  }
}

export default Incidents;
