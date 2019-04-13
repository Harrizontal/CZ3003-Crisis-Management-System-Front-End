import React, { Component } from "react";

class Setting extends Component {
  onSubmit = e => {
    e.preventDefault();
    console.log("click logout");
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };

  render() {
    return (
      <body className="bgLogout">
        <div className="formcontainer">
          <div className="logo" />
          <h1 className="hey">hey!</h1>
          <div className="settingsHeader">
            Be sure to <span className="firstwordsel">logout</span> of account
            after use.
          </div>
          <form onSubmit={this.onSubmit}>
            <button className="btnLogout">log me out</button>
          </form>
        </div>
      </body>
    );
  }
}

export default Setting;
