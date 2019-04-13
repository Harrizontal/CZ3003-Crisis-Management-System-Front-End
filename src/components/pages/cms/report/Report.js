// import React from "react";
import Popup from "reactjs-popup";
import React, { Component } from "react";
import facebook from "../../../../resources/facebook.svg";
import twitter from "../../../../resources/twitter.svg";
import all from "../../../../resources/all.svg";


class Report extends Component {
  state ={
    text: "",
    selectedoption: "Facebook",
    errror : {},
  };
  handleChange(change) {
    var input = change.target.value;
    var charnum = input.length;

    document.getElementById("remaining").innerHTML =
      (280 - charnum + " remaining characters");

  }
  checkFields = () => {
    const {
      error,
      text
    } = this.state;


    var empty = require("is-empty");
  if(text === "")
  {
    error["empty"] = "Please type something.";
  }
  if (empty(error)) {
    return true;
  } else {
    this.setState({ error: error });
    return false;
  }
}
  onSubmit = e => {
    e.preventDefault();
    const {
      text,
      selectedoption,
      error
    } = this.state;

    this.setState({
      text: "",
      selectedoption: "",
      errror : {}
    });

    window.confirm("Posted!");

    this.props.history.push("/");
  }

  render() {
    const {text, selectedoption, error} = this.state
    return (
      <div className="formcontainer2">
      <div style={{ display: "flex", flexDirection: "column", }} >
        <div style={{ flexGrow: "4" }}>
        <div style={{display:"flex", flexDirection:"row", alignItems: "baseline"}}>
          <div className="card-header"><span className="firstwordsel">post</span> to</div> 
          <div className="socialmedia"> : <label>{selectedoption}</label></div>
        </div>

          <div>
            <textarea className="reportText"
              maxLength="280"
              // style={{
              //   height: "100%",
              //   width: "100%",
              //   padding: "15",
              //   fontFamily: "rubik, san-serif"      
              // }}
              onChange={this.handleChange.bind(this)}
              placeholder="Enter details here."
              // id="ahh1"
            />
              {/* {error["empty"] && (
                  <div className="invalid-feedback">
                    {error["empty"]}
                  </div>
                )} */}
          </div>
        </div>

        <div style={{ flexGrow: "1", padding: "2%" }}>
          <span
            id="remaining"
            style={{
              color: "grey",
              float: "right",
              fontFamily: "rubik, san-serif"
            }}
            >
            280 remaining characters.
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
            <input className= "radioInput" type="radio" name="media" value="1" checked="checked" />{" "}
            <img src={all} style={{ height: "50px", width: "50px" }} />
          </div>
          <div style={{ flexGrow: "1", flexShrink: "1", textAlign: "center" }}>
            <input className= "radioInput" type="radio" name="media" value="2" />{" "}
            <img src={facebook} style={{ height: "50px", width: "50px" }} />
          </div>
          <div style={{ flexGrow: "1", flexShrink: "1", textAlign: "center" }}>
            <input className= "radioInput" type="radio" name="media" value="3" />{" "}
            <img src={twitter} style={{ height: "50px", width: "50px" }} />
          </div>
        </div>
        <div
          style={{
            flexGrow: "1",
            display: "flex"
          }}
        >
          <button className="btnSubmit"
            type="submit"
            // style={{
            //   flexGrow: "1",
            //   fontFamily: "rubik, sans-serif",
            //   fontWeight: "500",
            //   fontSize: "1em"
            // }}
          >
            Submit
          </button>
        </div>
      </div>  
      </div>
      
    );
  }
}

// const report = props => (

// );

export default Report;
