import React, { Component } from "react";

class Setting extends Component {
  onSubmit = e => {
    e.preventDefault();
    console.log("click logout");
    localStorage.removeItem("user");
    this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <h1 className="display-4">Settings</h1>
        <form onSubmit={this.onSubmit}>
          <button>Logout</button>
        </form>
      </div>
    );
  }
}

export default Setting;
