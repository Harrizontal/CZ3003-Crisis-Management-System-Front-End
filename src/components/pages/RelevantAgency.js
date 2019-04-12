import React, { Component } from "react";

export default class RelevantAgency extends Component {
  constructor(props) {
    super(props);
    this.state = { valid: false };
  }

  componentDidMount() {
    // call function
    this.setState({ valid: true });
  }
  render() {
    return (
      <div>{this.state.valid ? <div>Is true</div> : <div>Is false</div>}</div>
    );
  }
}
