import React, { Component } from "react";
import { connect } from "react-redux";

const style = {
  ui: {
    zIndex: 2,
    position: "absolute",
    right: "40px",
    top: "30px"
  },
  button: {
    marginRight: "2px",
    padding: "8%"
  }
};

class CreateIncidentButton extends Component {
  _directToCreateIncident(e) {
    this.props.history.push("/cms/incidentcreate");
  }

  componentWillUpdate(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <div id="ui" style={style.ui}>
        <div>
          <button
            className="createIncBTN"
            type="button"
            style={style.button}
            onClick={this._directToCreateIncident.bind(this)}
          >

          </button>
          <div className="createINC">create<br></br>incident</div>
        </div>
      </div>
    );
  }
}

export default connect()(CreateIncidentButton);
