// import React from "react";
import Popup from "reactjs-popup";
import React, { Component } from "react";
import facebook from "../../../../resources/facebook.svg";
import bfacebook from "../../../../resources/bfacebook.svg";
import twitter from "../../../../resources/twitter.svg";
import btwitter from "../../../../resources/btwitter.svg";
import all from "../../../../resources/all.svg";
import ball from "../../../../resources/bALL.svg";


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
        style={{ display: "flex", height: "200px", flexDirection: "column", }}
      >
        <div style={{ flexGrow: "4" }}>
          <div style={{ margin: "1%", height: "98%", width: "98%", borderRadius:20,}}>
            <textarea
              maxLength="280"
              style={{
                height: "100%",
                width: "100%",
                padding: "0",
                fontFamily: "rubik, san-serif"
              }}
              onChange={this.handleChange.bind(this)}
              placeholder="Enter details here."
              // onKeyUp="handleChange(this)"
              id="ahh1"
            />
          </div>
        </div>
        <div style={{ flexGrow: "1", padding: "2%" }}>
          <span
            id="remaining"
            style={{
              color: "red",
              float: "right",
              fontFamily: "rubik, san-serif"
            }}
          >
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
          <button
            type="submit"
            style={{
              flexGrow: "1",
              fontFamily: "rubik, sans-serif",
              fontWeight: "500",
              fontSize: "1em"
            }}
          >
            Submit
          </button>
          <button
            type="button"
            style={{
              flexGrow: "1",
              fontFamily: "rubik, san-serif",
              fontWeight: "500",
              fontSize: "1em"
            }}
          >
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
