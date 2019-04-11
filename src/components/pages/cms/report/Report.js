// import React from "react";
import Popup from "reactjs-popup";
import React, { Component } from "react";
import facebook from "../facebook.svg";
import twitter from "../twitter.svg";
import all from "../all.svg";

class Report extends Component {
  handleChange(change) {
    var input = change.target.value;
    var charnum = input.length;

    document.getElementById("remaining").innerHTML =
      280 - charnum + " remaining characters";
  }

  render() {
    return (
      <div
        style={{ display: "flex", height: "200px", flexDirection: "column" }}
      >
        <div style={{ flexGrow: "4" }}>
          <div style={{ margin: "1%", height: "98%", width: "98%" }}>
            <textarea
              maxLength="280"
              style={{ height: "100%", width: "100%", padding: "0" }}
              onChange={this.handleChange.bind(this)}
              // onKeyUp="handleChange(this)"
              id="ahh1"
            />
          </div>
        </div>
        <div style={{ flexGrow: "1", padding: "2%" }}>
          <span id="remaining" style={{ color: "red", float: "right" }}>
            280 remaining characters
          </span>
        </div>
        <div
          style={{
            flexGrow: "1",
            display: "flex",
            padding: "2%",
            paddingTop: "3%",
            flexBasis: "0"
          }}
        >
          <div style={{ flexGrow: "1", flexShrink: "1", textAlign: "center" }}>
            <input type="radio" name="media" value="1" checked="checked" />{" "}
            <img src={all} style={{ height: "32px", width: "32px" }} />
          </div>
          <div style={{ flexGrow: "1", flexShrink: "1", textAlign: "center" }}>
            <input type="radio" name="media" value="2" />{" "}
            <img src={facebook} style={{ height: "32px", width: "32px" }} />
          </div>
          <div style={{ flexGrow: "1", flexShrink: "1", textAlign: "center" }}>
            <input type="radio" name="media" value="3" />{" "}
            <img src={twitter} style={{ height: "32px", width: "32px" }} />
          </div>
        </div>
        <div
          style={{
            flexGrow: "1",
            display: "flex"
          }}
        >
          <button type="submit" style={{ flexGrow: "1" }}>
            Submit
          </button>
          <button type="button" style={{ flexGrow: "1" }}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

// const report = props => (

// );

export default Report;
