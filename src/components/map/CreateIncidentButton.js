import React, { Component } from "react";
import { connect } from "react-redux";
import { white } from "material-ui/styles/colors";

const style = {
  ui: {
    zIndex: 2,
    position: "absolute",
    right: "10px",
    top: "10px"
  },
  button: {
    marginRight: "2px",
    padding: "5%"
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
            Create Incident
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(CreateIncidentButton);
